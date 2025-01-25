'use client';

import React, { type ReactNode, useState } from 'react';

import { ChevronDown, ChevronRight } from 'lucide-react';

import { Button } from '@components/index';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@components/ui/collapsible';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';

interface Column {
  key: string;
  label: string;
}

interface CollapsibleTableProps<T> {
  columns: Column[];
  data: any[];
  renderDetails: (row: T) => React.ReactNode;
}

export function CollapsibleTable<T>({
  columns,
  data,
  renderDetails,
}: CollapsibleTableProps<T>) {
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setOpenRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            {columns.map(column => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <TableRow>
                <TableCell>
                  <Collapsible open={openRows.has(rowIndex)}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-9 p-0"
                        onClick={() => toggleRow(rowIndex)}>
                        {openRows.has(rowIndex) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle details</span>
                      </Button>
                    </CollapsibleTrigger>
                  </Collapsible>
                </TableCell>
                {columns.map(column => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  <Collapsible open={openRows.has(rowIndex)}>
                    <CollapsibleContent>
                      <div className="bg-muted/50 p-4">
                        {renderDetails(row)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
