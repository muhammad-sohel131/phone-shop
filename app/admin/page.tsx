"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Users,
  ShoppingBag,
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User, Phone } from "@/lib/db"
import {
  getUsers,
  updateUser,
  deleteUser,
  getPhones,
  updatePhone,
  deletePhone,
  getDiscussions,
  getReviews,
  getOrders,
  deleteDiscussion,
  deleteReview,
  deleteOrder,
  updateOrder,
} from "@/lib/storage"
import { useToast } from "@/components/ui/use-toast"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [userList, setUserList] = useState<User[]>([])
  const [productList, setProductList] = useState<Phone[]>([])
  const [orderList, setOrderList] = useState([])
  const [discussionList, setDiscussionList] = useState([])
  const [reviewList, setReviewList] = useState([])
  const { toast } = useToast()

  // Edit states
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingProduct, setEditingProduct] = useState<Phone | null>(null)
  const [editingOrder, setEditingOrder] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(false)
      setUserList(getUsers())
      setProductList(getPhones())
      setOrderList(getOrders())
      setDiscussionList(getDiscussions())
      setReviewList(getReviews())
  }, [user])

  const handleDeleteUser = (userId: number) => {
    deleteUser(userId)
    setUserList(getUsers())
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted.",
    })
  }

  const handleDeleteProduct = (productId: number) => {
    deletePhone(productId)
    setProductList(getPhones())
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    })
  }

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId)
    setOrderList(getOrders())
    toast({
      title: "Order deleted",
      description: "The order has been successfully deleted.",
    })
  }

  const handleDeleteDiscussion = (discussionId: number) => {
    deleteDiscussion(discussionId)
    setDiscussionList(getDiscussions())
    toast({
      title: "Discussion deleted",
      description: "The discussion has been successfully deleted.",
    })
  }

  const handleDeleteReview = (reviewId: number) => {
    deleteReview(reviewId)
    setReviewList(getReviews())
    toast({
      title: "Review deleted",
      description: "The review has been successfully deleted.",
    })
  }

  const handleUpdateUser = (updatedUser: User) => {
    updateUser(updatedUser.id, updatedUser)
    setUserList(getUsers())
    setEditingUser(null)
    toast({
      title: "User updated",
      description: "The user information has been successfully updated.",
    })
  }

  const handleUpdateProduct = (updatedProduct: Phone) => {
    updatePhone(updatedProduct.id, updatedProduct)
    setProductList(getPhones())
    setEditingProduct(null)
    toast({
      title: "Product updated",
      description: "The product information has been successfully updated.",
    })
  }

  const handleUpdateOrder = (orderId: string, status: "processing" | "shipped" | "delivered") => {
    updateOrder(orderId, { status })
    setOrderList(getOrders())
    setEditingOrder(null)
    toast({
      title: "Order updated",
      description: "The order status has been successfully updated.",
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, products, orders, and community content.</p>
        </div>

        {/* Dashboard Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userList.length}</div>
              <p className="text-xs text-muted-foreground">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              {/* <Phone className="h-4 w-4 text-muted-foreground" /> */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productList.length}</div>
              <p className="text-xs text-muted-foreground">+12 new products this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                    <BarChart className="h-8 w-8 mr-2" />
                    Sales Chart
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest activities across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { icon: Users, text: "New user registered", time: "2 minutes ago" },
                      { icon: ShoppingBag, text: "New order #1234", time: "15 minutes ago" },
                      // { icon: Phone, text: "New product added", time: "1 hour ago" },
                      { icon: MessageSquare, text: "New review posted", time: "3 hours ago" },
                      { icon: AlertTriangle, text: "Reported content", time: "5 hours ago" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2 h-8 w-8 flex items-center justify-center rounded-full bg-muted">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{item.text}</p>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Popular Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {productList.slice(0, 3).map((phone, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{phone.name}</p>
                          <p className="text-xs text-muted-foreground">{120 - i * 20} sales this month</p>
                        </div>
                        <TrendingUp
                          className={`h-4 w-4 ${i === 0 ? "text-green-500" : i === 1 ? "text-yellow-500" : "text-red-500"}`}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Top Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userList.map((user, i) => (
                      <div key={i} className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Comment", reason: "Spam content" },
                      { type: "Review", reason: "Inappropriate language" },
                      { type: "User", reason: "Fake account" },
                    ].map((report, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{report.type} Report</p>
                          <p className="text-xs text-muted-foreground">{report.reason}</p>
                        </div>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts, permissions, and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userList.map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>Make changes to user information.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  defaultValue={user.name}
                                  onChange={(e) => setEditingUser({ ...user, name: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                  id="email"
                                  defaultValue={user.email}
                                  onChange={(e) => setEditingUser({ ...user, email: e.target.value })}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => editingUser && handleUpdateUser(editingUser)}>Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
                <CardDescription>Add, edit, and manage product listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productList.map((product) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">${product.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                              <DialogDescription>Make changes to product information.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                  id="name"
                                  defaultValue={product.name}
                                  onChange={(e) => setEditingProduct({ ...product, name: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                  id="price"
                                  type="number"
                                  defaultValue={product.price}
                                  onChange={(e) =>
                                    setEditingProduct({
                                      ...product,
                                      price: Number.parseFloat(e.target.value),
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={() => editingProduct && handleUpdateProduct(editingProduct)}>
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderList.map((order) => (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Total: ${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Status: {order.status}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Pencil className="h-4 w-4 mr-2" />
                              Update Status
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Order Status</DialogTitle>
                              <DialogDescription>Change the status of this order.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex flex-col gap-2">
                                <Button
                                  variant={order.status === "processing" ? "default" : "outline"}
                                  onClick={() => handleUpdateOrder(order.id, "processing")}
                                >
                                  Processing
                                </Button>
                                <Button
                                  variant={order.status === "shipped" ? "default" : "outline"}
                                  onClick={() => handleUpdateOrder(order.id, "shipped")}
                                >
                                  Shipped
                                </Button>
                                <Button
                                  variant={order.status === "delivered" ? "default" : "outline"}
                                  onClick={() => handleUpdateOrder(order.id, "delivered")}
                                >
                                  Delivered
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteOrder(order.id)}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Community Management</CardTitle>
                <CardDescription>Moderate discussions, reviews, and user content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Discussions</h3>
                    <div className="space-y-4">
                      {discussionList.map((discussion) => (
                        <div key={discussion.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{discussion.title}</p>
                            <p className="text-sm text-muted-foreground">by User {discussion.userId}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteDiscussion(discussion.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Reviews</h3>
                    <div className="space-y-4">
                      {reviewList.map((review) => (
                        <div key={review.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{review.title}</p>
                            <p className="text-sm text-muted-foreground">for Phone {review.phoneId}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

