import { eq, getTableColumns } from 'drizzle-orm';
import { SQLiteTable } from 'drizzle-orm/sqlite-core';
import { db } from '@/lib/db';

export class BaseRepository<
  TTable extends SQLiteTable,
  TPrimaryKey extends keyof TTable['$inferSelect'] = 'id' extends keyof TTable['$inferSelect']
    ? 'id'
    : keyof TTable['$inferSelect'],
> {
  constructor(
    protected table: TTable,
    protected primaryKeyName: TPrimaryKey = 'id' as TPrimaryKey // Defaults to 'id', but can be overridden
  ) {}

  /**
   * Safely extract the primary key column based on primaryKeyName
   */
  protected getPrimaryKeyColumn() {
    const columns = getTableColumns(this.table);
    const keyStr = String(this.primaryKeyName);

    if (keyStr in columns) {
      // Use indexed access to return the exact column type safely
      return columns[keyStr as keyof typeof columns];
    }

    throw new Error(`Table does not have a primary key column named '${keyStr}'.`);
  }

  /**
   * Get all records from the table
   */
  async findAll(): Promise<TTable['$inferSelect'][]> {
    return await db.select().from(this.table);
  }

  /**
   * Find a single record by the primary key
   */
  async findById(id: number | string): Promise<TTable['$inferSelect'] | undefined> {
    const pkCol = this.getPrimaryKeyColumn();

    const result = await db.select().from(this.table).where(eq(pkCol, id));

    return result[0];
  }

  /**
   * Insert a new record
   */
  async create(data: TTable['$inferInsert']): Promise<TTable['$inferSelect']> {
    const [inserted] = await db.insert(this.table).values(data).returning();

    return inserted;
  }

  /**
   * Update a record by the primary key
   */
  async update(
    id: number | string,
    data: Partial<TTable['$inferInsert']>
  ): Promise<TTable['$inferSelect'] | undefined> {
    const pkCol = this.getPrimaryKeyColumn();

    const [updated] = await db.update(this.table).set(data).where(eq(pkCol, id)).returning();

    return updated;
  }

  /**
   * Delete a record by the primary key
   */
  async delete(id: number | string): Promise<TTable['$inferSelect'] | undefined> {
    const pkCol = this.getPrimaryKeyColumn();

    const [deleted] = await db.delete(this.table).where(eq(pkCol, id)).returning();

    return deleted;
  }
}
