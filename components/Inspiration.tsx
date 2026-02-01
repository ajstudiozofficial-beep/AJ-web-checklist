import React, { useState } from 'react';
import { InspirationItemType } from '../types';
import { 
  Loader2, Check, X, ChevronRight, Mail, User, Lock, 
  Search, ShoppingBag, Trash2, Plus, Minus, Settings, 
  CreditCard, Bell, Shield, Calendar, MoreHorizontal, Maximize2 
} from 'lucide-react';

interface InspirationProps {
  items: InspirationItemType[];
}

// --- SHADCN UI PRIMITIVES (Simulated) ---

const Button = ({ className = "", variant = "default", size = "default", children, ...props }: any) => {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50";
  
  const variants: any = {
    default: "bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
    destructive: "bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
    outline: "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-black dark:hover:bg-gray-800 dark:hover:text-gray-50",
    secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
    ghost: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
    link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
  };

  const sizes: any = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-8",
    icon: "h-9 w-9",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }: any) => (
  <input
    className={`flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${className}`}
    {...props}
  />
);

const Label = ({ className = "", children, ...props }: any) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
    {children}
  </label>
);

const Card = ({ className = "", children, ...props }: any) => (
  <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow dark:border-gray-800 dark:bg-black dark:text-gray-50 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children }: any) => <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
const CardTitle = ({ className = "", children }: any) => <h3 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
const CardDescription = ({ className = "", children }: any) => <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>;
const CardContent = ({ className = "", children }: any) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardFooter = ({ className = "", children }: any) => <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>;

const Switch = ({ checked, onCheckedChange }: any) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    className={`peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-black ${
      checked ? 'bg-gray-900 dark:bg-gray-50' : 'bg-gray-200 dark:bg-gray-800'
    }`}
  >
    <span
      className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
        checked ? 'translate-x-4 dark:bg-black' : 'translate-x-0'
      }`}
    />
  </button>
);

const Checkbox = ({ checked, onCheckedChange }: any) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    className={`peer h-4 w-4 shrink-0 rounded-sm border border-gray-900 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-50 dark:focus-visible:ring-gray-300 ${
      checked ? 'bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900' : 'border-gray-200 dark:border-gray-800'
    }`}
  >
    {checked && <Check className="h-3 w-3 mx-auto" />}
  </button>
);

const Badge = ({ variant = "default", children }: any) => {
    const variants: any = {
        default: "border-transparent bg-gray-900 text-gray-50 hover:bg-gray-900/80 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/80",
        secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        destructive: "border-transparent bg-red-500 text-gray-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/80",
        outline: "text-gray-950 dark:text-gray-50",
    };
    return (
        <div className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${variants[variant]}`}>
            {children}
        </div>
    )
}

const Avatar = ({ src, fallback }: any) => (
    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        {src ? <img className="aspect-square h-full w-full" src={src} /> : <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">{fallback}</div>}
    </div>
)

const Separator = () => <div className="shrink-0 bg-gray-200 dark:bg-gray-800 h-[1px] w-full my-4" />


// --- MOCKUPS USING SHADCN PRIMITIVES ---

// 1. Generic Form (Login/Contact/Register)
const MockupGenericForm = ({ index = 0 }: { index?: number }) => {
    const isLogin = index % 3 === 0;
    const isContact = index % 3 === 1;
    const isRegister = index % 3 === 2;

    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <Card className="w-full max-w-[350px] shadow-lg">
                <CardHeader>
                    <CardTitle>{isLogin ? "Welcome back" : isContact ? "Contact Us" : "Create Account"}</CardTitle>
                    <CardDescription>{isLogin ? "Enter your credentials" : "We'd love to hear from you"}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {(isLogin || isRegister) && (
                           <div className="grid grid-cols-2 gap-6">
                                <Button variant={index === 0 ? "outline" : "secondary"}><div className={`mr-2 h-4 w-4 rounded-full ${index===0 ? "bg-gray-900 dark:bg-gray-50" : "bg-blue-500"}`} /> Github</Button>
                                <Button variant="outline"><div className="mr-2 h-4 w-4 rounded-full bg-red-500" /> Google</Button>
                            </div>
                        )}
                        {(isLogin || isRegister) && (
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200 dark:border-gray-800" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-black px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
                                </div>
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" />
                        </div>
                        {isContact && (
                             <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Input id="message" className="h-20" />
                            </div>
                        )}
                        {!isContact && (
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" />
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" variant={index === 5 ? "secondary" : "default"}>{isLogin ? "Sign In" : isContact ? "Send Message" : "Create account"}</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

// 2. Component Playground (Toggles, Checkboxes, Badges)
const MockupComponentPlayground = ({ index = 0 }: { index?: number }) => {
    const [notif, setNotif] = useState(index % 2 === 0);
    const [marketing, setMarketing] = useState(index % 2 !== 0);
    
    return (
        <div className="flex items-center justify-center h-full w-full p-4">
            <Card className="w-full max-w-[320px] shadow-sm">
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage your preferences.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="functional" className="flex flex-col space-y-1">
                            <span>Functional Cookies</span>
                            <span className="font-normal text-xs text-gray-500 dark:text-gray-400">Essential for the site.</span>
                        </Label>
                        <Switch checked={notif} onCheckedChange={setNotif} />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="marketing" className="flex flex-col space-y-1">
                            <span>Marketing Emails</span>
                            <span className="font-normal text-xs text-gray-500 dark:text-gray-400">Receive offers.</span>
                        </Label>
                        <Switch checked={marketing} onCheckedChange={setMarketing} />
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" checked={true} onCheckedChange={() => {}} />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>Badge</Badge>
                        <Badge variant={index === 2 ? "destructive" : "secondary"}>Tag</Badge>
                        {index > 3 && <Badge variant="outline">New</Badge>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// 3. Cart Drawer / Sheet
const MockupCartDrawer = ({ index = 0 }: { index?: number }) => {
    return (
        <div className="flex h-full w-full font-sans relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
             {/* Mocking a Sheet/Drawer on the right */}
             <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 shadow-xl flex flex-col h-full">
                <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-100 dark:border-gray-800">
                    <h3 className="font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100">Shopping Cart</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">You have {index + 1} items in your cart.</p>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Item 1 */}
                    <div className="flex gap-4">
                        <div className="h-16 w-16 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">Cotton Hoodie</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Size: M</p>
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">$55.00</span>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-6 w-6"><Minus className="h-3 w-3" /></Button>
                                    <span className="text-xs text-gray-900 dark:text-gray-100">1</span>
                                    <Button variant="outline" size="icon" className="h-6 w-6"><Plus className="h-3 w-3" /></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Item 2 - Conditional based on index */}
                    {index > 1 && (
                        <div className="flex gap-4">
                             <div className="h-16 w-16 rounded-md border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                                <CreditCard className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">Gift Card</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Value: $20</p>
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">$20.00</span>
                                    <Button variant="ghost" size="sm" className="h-6 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 text-xs">Remove</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total</span>
                        <span className="text-base font-bold text-gray-900 dark:text-gray-100">${75 + (index * 10)}.00</span>
                    </div>
                    <Button className="w-full" variant={index === 4 ? "secondary" : "default"}>Checkout</Button>
                </div>
             </div>
             
             {/* Background blur hint */}
             <div className="absolute inset-0 right-[300px] bg-black/5 dark:bg-black/20" />
        </div>
    );
}

// 4. Content Layout (Blog/Article/Page)
const MockupContentLayout = ({ index = 0 }: { index?: number }) => {
    return (
        <div className="flex flex-col h-full w-full bg-white dark:bg-black font-sans p-8 overflow-hidden relative">
            <div className="max-w-md mx-auto w-full space-y-6">
                <div className="space-y-2">
                    <Badge variant={index % 2 === 0 ? "secondary" : "default"} className="w-fit">{index % 2 === 0 ? "Release Notes" : "Blog"}</Badge>
                    <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl text-gray-900 dark:text-gray-100">
                        {index % 2 === 0 ? "Updating the Design System" : "Why we moved to React"}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Avatar fallback="JD" />
                        <span>John Doe</span>
                        <span>•</span>
                        <span>Oct 23</span>
                    </div>
                </div>
                <Separator />
                <div className="space-y-4">
                    <p className="leading-7 text-sm text-gray-600 dark:text-gray-300">
                        {index % 2 === 0 
                            ? "We are excited to announce a complete overhaul of our design system. This update focuses on accessibility."
                            : "React provides a component-based architecture that saves us time and money in the long run."
                        }
                    </p>
                    <Card className="bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                        <CardHeader className="p-4">
                             <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <CardTitle className="text-sm">Security Update</CardTitle>
                             </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 text-xs text-gray-500 dark:text-gray-400">
                            We've also patched several security vulnerabilities in the authentication flow.
                        </CardContent>
                    </Card>
                </div>
                <div className="flex gap-4 pt-4">
                    <Button variant="outline" size="sm">Read Documentation</Button>
                    {index > 2 && <Button size="sm">Upgrade Now</Button>}
                </div>
            </div>
        </div>
    );
}

// 5. Input States
const MockupInputStates = ({ index = 0 }: { index?: number }) => {
    return (
        <div className="flex items-center justify-center h-full w-full p-4">
             <Card className="w-full max-w-[350px] shadow-sm">
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Update your profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid gap-2">
                        <Label htmlFor="username" className={index === 3 ? "text-red-500" : ""}>Username</Label>
                        <Input 
                            id="username" 
                            placeholder="@shadcn" 
                            defaultValue="@shadcn" 
                            className={index === 3 ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        <p className={`text-[0.8rem] ${index === 3 ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}>
                            {index === 3 ? "Username already taken." : "This is your public display name."}
                        </p>
                     </div>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Email" defaultValue="user@example.com" disabled={index === 5} />
                     </div>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button disabled={index === 5}>Save changes</Button>
                </CardFooter>
             </Card>
        </div>
    );
}

// 6. Button Gallery
const MockupButtonGallery = ({ index = 0 }: { index?: number }) => {
    const mainVariant = index === 0 ? "default" : index === 1 ? "secondary" : index === 2 ? "outline" : index === 3 ? "destructive" : index === 4 ? "ghost" : "link";
    
    return (
        <div className="flex items-center justify-center h-full w-full p-6">
             <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="space-y-2 col-span-2 text-center pb-4">
                    <h4 className="text-sm font-medium capitalize text-gray-900 dark:text-white">{mainVariant} Variant</h4>
                </div>
                <div className="space-y-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">default</span>
                    <Button className="w-full" variant={mainVariant}>Button</Button>
                </div>
                <div className="space-y-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">sm</span>
                    <Button variant={mainVariant} size="sm" className="w-full">Button</Button>
                </div>
                <div className="space-y-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">lg</span>
                    <Button variant={mainVariant} size="lg" className="w-full">Button</Button>
                </div>
                <div className="space-y-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">icon</span>
                    <div className="flex justify-center">
                        <Button variant={mainVariant} size="icon"><Mail className="w-4 h-4" /></Button>
                    </div>
                </div>
             </div>
        </div>
    );
}

// 7. Loading/Skeleton
const MockupSkeleton = ({ index = 0 }: { index?: number }) => {
     return (
        <div className="flex items-center justify-center h-full w-full p-8 relative">
            <div className="flex items-center space-x-4 w-full max-w-sm">
                <div className={`h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 ${index % 2 === 0 ? "animate-pulse" : ""}`} />
                <div className="space-y-2 flex-1">
                    <div className={`h-4 w-[250px] bg-gray-200 dark:bg-gray-800 rounded ${index % 2 === 0 ? "animate-pulse" : ""}`} />
                    <div className={`h-4 w-[200px] bg-gray-200 dark:bg-gray-800 rounded ${index % 2 === 0 ? "animate-pulse" : ""}`} />
                </div>
            </div>
            
            <div className="absolute bottom-8 right-8">
                 <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {index === 3 ? "Loading..." : "Please wait"}
                 </Button>
            </div>
        </div>
     );
}

// --- RENDERER HELPER ---
const renderMockup = (type: string, index: number) => {
    switch (type) {
        case 'behold': return <MockupContentLayout index={index} />;
        case 'bookstory': return <MockupContentLayout index={index} />;
        case 'skeleton': return <MockupSkeleton index={index} />;
        case 'spinner': return <MockupSkeleton index={index} />;
        case 'login-simple': return <MockupGenericForm index={index} />;
        case 'generic-form': return <MockupGenericForm index={index} />;
        case 'content-layout': return <MockupContentLayout index={index} />;
        case 'component-playground': return <MockupComponentPlayground index={index} />;
        case 'cart-drawer': return <MockupCartDrawer index={index} />;
        case 'input-states': return <MockupInputStates index={index} />;
        case 'button-gallery': return <MockupButtonGallery index={index} />;
        default: return <MockupContentLayout index={index} />;
    }
};

export const Inspiration: React.FC<InspirationProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<InspirationItemType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            onClick={() => { setSelectedItem(item); setSelectedIndex(index); }}
            className="group cursor-pointer flex flex-col gap-3"
          >
              <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden aspect-[16/10] shadow-sm group-hover:shadow-md transition-all relative flex items-center justify-center bg-gray-50/50 dark:bg-dark-bg/50">
                  
                  {/* Preview Container - Scaled down and non-interactive */}
                  <div className="pointer-events-none transform scale-75 group-hover:scale-[0.8] transition-transform duration-500 origin-center w-full h-full flex items-center justify-center select-none">
                     {renderMockup(item.type, index)}
                  </div>

                  {/* Hover Overlay Icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white dark:bg-black p-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Maximize2 className="w-5 h-5 text-gray-900 dark:text-white" />
                      </div>
                  </div>
              </div>
              
              <div className="flex justify-between items-center px-1">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                  </div>
              </div>
          </div>
        ))}
      </div>

      {/* COMPACT MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
                onClick={() => setSelectedItem(null)}
            />
            <div className="relative w-full max-w-4xl bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card z-10 shrink-0">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{selectedItem.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Interactive Preview</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-auto bg-gray-50/50 dark:bg-black/50 p-8 flex items-center justify-center min-h-[500px]">
                    <div className="w-full h-full flex items-center justify-center">
                         {renderMockup(selectedItem.type, selectedIndex)}
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};