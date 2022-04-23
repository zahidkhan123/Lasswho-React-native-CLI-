import React from 'react';
import { tailwind } from '@tailwind';
import { Text } from '@components';

interface Props {
  status: string;
}

const statuses = [
  { 'status': 'confirmed', 'text': 'CONFIRMED', 'color': 'lasswho-green' },
  { 'status': 'cancelled', 'text': 'CANCELLED', 'color': 'lasswho-accent' },
  { 'status': 'pending', 'text': 'PENDING', 'color': 'gray-300' },
  { 'status': 'not paid', 'text': 'NOT PAID', 'color': 'lasswho-accent' },
  { 'status': 'completed', 'text': 'RATE', 'color': 'lasswho-accent' },
]

export const MeetingLabel = ({ status }: Props) => {
  const statusObject = statuses.find(obj => {
    return obj.status === status;
  })
  return (
    <Text style={tailwind(`mt-2 text-xs text-${statusObject?.color}`)}>{statusObject?.text}</Text>
  )

}