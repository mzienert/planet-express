'use client';

import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Send } from "lucide-react";
  import { Loader2 } from "lucide-react"
  
const TrackingCard = () => {
    const [loadingTracking, setLoadingTracking] = useState<boolean>(false);

    const clickTrackHandler = (e: any) => {
        console.log('event: ', e);
        setLoadingTracking(true);
      }

    return (
        <div className="w-1/2 mt-48">
          <Card>
            <CardHeader>
              <CardTitle>Tracking Numbers</CardTitle>
              <CardDescription>
                Enter your tracking numbers below. One on each line.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full">
                <Input type="email" placeholder="Email" />
                {loadingTracking ?
                    <Button disabled>
                        <Loader2 className="animate-spin" />
                        Please wait
                    </Button>
                :
                    <Button type="submit" onClick={clickTrackHandler}>
                        <Send /> Track
                    </Button>
                }
              </div>
            </CardContent>
          </Card>
        </div>
    );
}

export default TrackingCard;