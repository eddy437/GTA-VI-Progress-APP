'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface Column<T> {
  key: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  className?: string;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className,
  sortColumn,
  sortDirection,
  onSort,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-sm font-semibold text-muted-foreground',
                  column.sortable && 'cursor-pointer hover:text-foreground',
                  column.className
                )}
                onClick={() => column.sortable && onSort?.(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {column.sortable && sortColumn === column.key && (
                    <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={cn(
                'border-b border-white/5 transition-colors',
                onRowClick && 'cursor-pointer hover:bg-white/5'
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3">
                  {column.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}