
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Account = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="font-medium text-sm">Name</div>
                <div>{user.name}</div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium text-sm">Email</div>
                <div>{user.email}</div>
              </div>
              <div className="grid gap-2">
                <div className="font-medium text-sm">Member Since</div>
                <div>{new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Security and account-related actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" onClick={() => toast({
              title: "Feature Coming Soon",
              description: "Password change functionality will be available soon."
            })}>
              Change Password
            </Button>
            <Separator />
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;
