import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { generateMockEmbedding } from '../utils/mockVectors';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async addJob(data: { title: string; description: string }) {
    const embedding = generateMockEmbedding(data.description); 
    const embeddingStr = `'[${embedding.join(',')}]'`; 
  
    return this.prisma.$executeRawUnsafe(`
      INSERT INTO "Job" (title, description, embedding)
      VALUES ($1, $2, ${embeddingStr}::vector)
    `, data.title, data.description);
  }
  

  async addCandidate(data: { name: string; summary: string }) {
    const embedding = generateMockEmbedding(data.summary);
  
    // Ensure correct format for pgvector
    const embeddingStr = `[${embedding.join(',')}]`;
  
    return this.prisma.$executeRawUnsafe(
      `INSERT INTO "Candidate" (name, summary, embedding) VALUES ($1, $2, $3::vector)`,
      data.name,
      data.summary,
      embeddingStr
    );
  }
  
  

  async matchCandidates(input: { jobId?: number; description: string }) {
    let embedding: number[];
  
    if (input.jobId) {
      const job: any = await this.prisma.$queryRawUnsafe(
        `SELECT embedding::text FROM "Job" WHERE id = $1 LIMIT 1`,
        input.jobId
      );
  
      if (!job || !job[0]) throw new Error('Job not found');
  
      embedding = job[0].embedding
        .replace('[', '')
        .replace(']', '')
        .split(',')
        .map(Number);
    } else {
      embedding = generateMockEmbedding(input.description);
    }
  
    const embeddingVector = `[${embedding.join(',')}]`;
  
    return await this.prisma.$queryRawUnsafe(
      `SELECT id, name, summary, embedding::text FROM "Candidate" ORDER BY embedding <#> $1::vector LIMIT 3`,
      embeddingVector
    );
  }
  
  
}

