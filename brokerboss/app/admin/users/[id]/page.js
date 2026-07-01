"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Calendar,
  Building,
  ShieldCheck,
  ShieldAlert,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


export default function UserDetailsPage({ params }) {
  const { id } = use(params);
  const userId = parseInt(id, 10);

  // Find user by ID
  const user = [].find((u) => u.id === userId) || [][0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <div>
        <Button asChild variant="ghost" className="gap-2 -ml-2 text-muted-foreground hover:text-foreground">
          <Link href="/admin/users">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Users</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Details</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          View full registration profile and details for this user.
        </p>
      </div>

      {/* User Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info block */}
        <div className="md:col-span-1 p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col items-center text-center gap-4">
          <Avatar className="w-20 h-20 text-xl font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <AvatarFallback>{user?.avatar}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-lg font-bold text-foreground">@{user?.username}</h2>
            <Badge variant="outline" className="mt-1.5 capitalize bg-primary/5 text-primary border-primary/20">
              {user?.role || "user"}
            </Badge>
          </div>

          <Badge
            variant="outline"
            className={`w-full py-1 justify-center ${
              user?.status === "Active"
                ? "border-green-300 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400"
                : "border-red-300 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {user?.status === "Active" ? (
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Active</span>
            ) : (
              <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> Blocked</span>
            )}
          </Badge>
        </div>

        {/* Detailed Metadata fields */}
        <div className="md:col-span-2 p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
          <h3 className="text-base font-semibold text-foreground border-b border-border pb-2">
            Profile Metadata
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* User ID */}
            <div className="flex items-center gap-3">
              <Fingerprint className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">User ID</span>
                <span className="text-sm font-medium text-foreground">{user?.id}</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Email Address</span>
                <span className="text-sm font-medium text-foreground break-all">{user?.email}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Location</span>
                <span className="text-sm font-medium text-foreground">{user?.location}</span>
              </div>
            </div>

            {/* Date Joined */}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Date Joined</span>
                <span className="text-sm font-medium text-foreground">{user?.joinDate}</span>
              </div>
            </div>

            {/* Properties Listed */}
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4 text-primary shrink-0" />
              <div>
                <span className="text-xs text-muted-foreground block font-medium">Properties Listed</span>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  {user?.propertiesListed} listings
                </span>
              </div>
            </div>

          </div>

          <hr className="border-border" />

          {/* Description / Bio based on User Role */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">User Overview</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This user is registered as a <span className="font-semibold capitalize text-foreground">{user?.role}</span> on the BrokerBoss platform. 
              They are based in {user?.location} and joined on {user?.joinDate}. 
              They currently have {user?.propertiesListed} property listings registered in our system.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
