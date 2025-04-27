
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Orders = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Mock orders data - in a real application, this would come from an API
  const mockOrders = [
    {
      id: "ORD-001",
      date: "2025-04-20",
      total: 1299.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002", 
      date: "2025-04-15",
      total: 549.50,
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2025-04-05",
      total: 99.99,
      status: "Shipped",
      items: 1,
    },
  ];

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      {mockOrders.length > 0 ? (
        <div className="grid gap-6">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Order #{order.id}</CardTitle>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                    order.status === "Shipped" ? "bg-blue-100 text-blue-800" : 
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Items</span>
                    <span className="font-medium">{order.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total</span>
                    <span className="font-medium">₹{order.total.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toast({
                        title: "Feature Coming Soon",
                        description: "Order details view will be available soon."
                      })}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toast({
                        title: "Feature Coming Soon",
                        description: "Track shipment functionality will be available soon."
                      })}
                    >
                      Track Shipment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-lg text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <Button onClick={() => window.location.href = "/products"}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
