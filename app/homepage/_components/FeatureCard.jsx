import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

function FeatureCard({ icon, title, description }) {
  return (
    
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg dark:bg-gray-800">{icon}</div>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
    }

export default FeatureCard