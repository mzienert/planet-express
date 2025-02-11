"use client";

import React, { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TrackingCard = () => {
  const [loadingTracking, setLoadingTracking] = useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Validate on input change after first interaction
  useEffect(() => {
    if (isDirty) {
      const validationError = validateTrackingNumber(trackingNumber);
      setError(validationError);
    }
  }, [trackingNumber, isDirty]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
    setIsDirty(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateTrackingNumber(trackingNumber);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoadingTracking(true);

    try {
      console.log("Tracking number submitted:", trackingNumber);
      // Simulating some async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Failed to fetch tracking information");
    } finally {
      setLoadingTracking(false);
    }
  };

  const validateTrackingNumber = (number) => {
    const regex = /^[A-Za-z0-9-]{8,30}$/;

    if (!number) {
      return "Tracking number is required";
    }
    if (!regex.test(number)) {
      return "Invalid tracking number format";
    }
    return "";
  };

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
          <form onSubmit={handleSubmit} className="flex w-full">
            <Input
              type="text"
              placeholder="Tracking Number"
              value={trackingNumber}
              onChange={handleInputChange}
            />
            {loadingTracking ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Tracking...
              </Button>
            ) : (
              <Button type="submit" disabled={loadingTracking || !!error}>
                <Send /> Track Package
              </Button>
            )}
          </form>
          {error && isDirty && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingCard;
