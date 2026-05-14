"use client"

import { ReactNode } from "react"

interface AdminTableProps<T> {
  columns: {
    key: string
    header: string
    render?: (item: T) => ReactNode
  }[]
  data: T[]
  keyExtractor: (item: T) => string
  emptyMessage?: string
  onRowClick?: (item: T) => void
}

export default function AdminTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data available",
  onRowClick
}: AdminTableProps<T>) {
  return (
    <div className="admin-table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="admin-empty">
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                style={{
                  cursor: onRowClick ? "pointer" : "default"
                }}
              >
                {columns.map((column) => (
                  <td key={`${keyExtractor(item)}-${column.key}`}>
                    {column.render
                      ? column.render(item)
                      : (item as Record<string, unknown>)[column.key] as ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
