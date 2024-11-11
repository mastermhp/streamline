import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

function AnalyticsCard({ title, value, icon }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="text-muted-foreground mb-2">{icon}</div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCard