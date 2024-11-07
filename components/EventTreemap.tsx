'use client' 

import React, { useMemo } from 'react'
import { Treemap, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Event } from '../types/Event'
import { eventsData } from '../data/events'

interface TreemapData {
  name: string
  size: number // totalSeats
  totalSeats: number
  fillPercentage: number
  color: string
}

interface CustomizedContentProps {
  depth: number
  x: number
  y: number
  width: number
  height: number
  index: number
  name: string
  color: string
}

const getColor = (percentage: number): string => {
  const hue = (percentage / 100) * 120 
  return `hsl(${hue}, 100%, 40%)` 
}

const EventTreemap: React.FC = () => {
  const data: TreemapData[] = useMemo(() => {
    return eventsData.map((event, index) => {
      const fillPercentage = (event.seatsFilled / event.totalSeats) * 100
      return {
        name: event.name,
        size: event.totalSeats, 
        totalSeats: event.totalSeats,
        fillPercentage: parseFloat(fillPercentage.toFixed(2)),
        color: getColor(fillPercentage),
      }
    })
  }, [])

  const renderTooltip = ({
    payload,
  }: {
    payload?: any
    label?: string
    active?: boolean
  }) => {
    if (payload && payload.length && active) {
      const event = payload[0].payload as TreemapData
      return (
        <div className="bg-gray-800 text-white p-2 border border-gray-700 rounded shadow-lg">
          <strong>{event.name}</strong>
          <br />
          Seats Filled: {event.fillPercentage}% ({event.fillPercentage}%)
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-96 md:h-[600px] relative">
      <ResponsiveContainer>
        <Treemap
          aria-label="Event Seat Registrations Heatmap"
          data={data}
          dataKey="size" 
          nameKey="name"
          stroke="none" 
          fill="#8884d8" 
          ratio={4 / 3} 
          content={CustomizedContent} 
          tooltip={<Tooltip content={renderTooltip} />}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Treemap>
      </ResponsiveContainer>
      {/* Legend */}
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <span
            className="inline-block w-4 h-4 mr-2 rounded"
            style={{ backgroundColor: getColor(90) }}
          ></span>
          <span>&gt; 80% Filled</span>
        </div>
        <div className="flex items-center">
          <span
            className="inline-block w-4 h-4 mr-2 rounded"
            style={{ backgroundColor: getColor(65) }}
          ></span>
          <span>50% - 80% Filled</span>
        </div>
        <div className="flex items-center">
          <span
            className="inline-block w-4 h-4 mr-2 rounded"
            style={{ backgroundColor: getColor(30) }}
          ></span>
          <span>&lt; 50% Filled</span>
        </div>
      </div>
    </div>
  )
}

const CustomizedContent: React.FC<CustomizedContentProps> = (props) => {
  const { depth, x, y, width, height, index, name, color } = props

  const displayName = name || ''

  const fontSize = Math.min(width / displayName.length, height / 4)

  const showLabel = width > 100 && height > 40

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#1f2937', 
          strokeWidth: 1,
          cursor: 'pointer',
        }}
      />
      {showLabel && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: '#f3f4f6', 
            fontSize: fontSize,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {displayName}
        </text>
      )}
    </g>
  )
}

export default EventTreemap
