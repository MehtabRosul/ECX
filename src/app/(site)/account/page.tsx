'use client';

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader2, User, Mail, Phone, MapPin, Save, LogOut, Pencil, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/lib/dbHelpers";

export default function AccountPage() {
  const router = useRouter();
  const { user, profile, updateProfile, signOutUser, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    address: {
      country: "",
      state: "",
      city: "",
      street: "",
    },
    gender: "",
  });

  const getResolvedCountry = (profileData?: UserProfile | null) => {
    if (!profileData) return "";
    const addressCountry = profileData.address?.country;
    if (typeof addressCountry === "string" && addressCountry.trim().length > 0) {
      return addressCountry;
    }
    const legacyCountry = profileData.country;
    if (typeof legacyCountry === "string" && legacyCountry.trim().length > 0) {
      return legacyCountry;
    }
    return "";
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (profile) {
      const address = profile.address || {};
      const resolvedCountry = getResolvedCountry(profile);
      setFormData({
        displayName: profile.displayName || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || "",
        countryCode: profile.countryCode || "+1",
        address: {
          country: resolvedCountry,
          state: address.state || "",
          city: address.city || "",
          street: address.street || "",
        },
        gender: profile.gender || "",
      });
    } else if (user && !profile) {
      // If user exists but profile hasn't loaded yet, use user data
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        displayName: user.displayName || prev.displayName,
      }));
    }
  }, [profile, user]);

  // Get avatar based on gender
  const getGenderAvatar = (gender: string | null | undefined): string | null => {
    if (!gender) {
      // No gender selected - show initials
      return null;
    }
    
    switch (gender.toLowerCase()) {
      case 'male':
        // Use thumbnail API which is more reliable for Google Drive
        return 'https://drive.google.com/thumbnail?id=1ccMwtE9lfhMZbViXsdS-f3-xryhI_Z5w&sz=w1000';
      case 'female':
        return 'https://drive.google.com/thumbnail?id=1ri7CpG9ktmtOG3dBDywbFLmCxXJEPn9x&sz=w1000';
      case 'other':
      case 'prefer-not-to-say':
      default:
        // Show initials for other/prefer not to say
        return null;
    }
  };

  // Component for gender-based avatar display
  function GenderAvatarDisplay({ 
    gender, 
    displayName, 
    getInitials 
  }: { 
    gender: string | null | undefined; 
    displayName: string | null | undefined;
    getInitials: (name: string | null | undefined) => string;
  }) {
    const avatarUrl = useMemo(() => {
      const url = getGenderAvatar(gender);
      console.log('🔵 Account Page - Gender:', gender);
      console.log('🔵 Account Page - Avatar URL:', url);
      return url;
    }, [gender]);

    return (
      <div className="flex flex-col items-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b">
        <div className="relative group mb-4">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 ring-2 sm:ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40 group-hover:scale-105">
            {avatarUrl ? (
              <AvatarImage 
                src={avatarUrl}
                alt={displayName || "User"}
                key={`gender-avatar-${gender || 'default'}`}
                className="object-cover"
                onError={(e) => {
                  console.error('❌ Account Page Avatar failed to load:', avatarUrl);
                  console.error('Gender value:', gender);
                }}
                onLoad={() => {
                  console.log('✅ Account Page Avatar loaded:', avatarUrl);
                }}
              />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-primary text-xl sm:text-2xl font-semibold">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    try {
      const sanitizedAddress = {
        country: formData.address.country || null,
        state: formData.address.state || "",
        city: formData.address.city || "",
        street: formData.address.street || "",
      };

      const updates: Partial<UserProfile> = {
        displayName: formData.displayName || null,
        email: formData.email || undefined,
        phone: formData.phone || null,
        countryCode: formData.countryCode || null,
        address: sanitizedAddress,
        country: sanitizedAddress.country || null,
        gender: formData.gender || null,
      };

      await updateProfile(updates);
      setEditMode(false);
      setEditingField(null);

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data to original profile values
    if (profile) {
      const address = profile.address || {};
      const resolvedCountry = getResolvedCountry(profile);
      setFormData({
        displayName: profile.displayName || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || "",
        countryCode: profile.countryCode || "+1",
        address: {
          country: resolvedCountry,
          state: address.state || "",
          city: address.city || "",
          street: address.street || "",
        },
        gender: profile.gender || "",
      });
    }
    setEditMode(false);
    setEditingField(null);
  };

  const toggleFieldEdit = (fieldName: string) => {
    if (editingField === fieldName) {
      setEditingField(null);
    } else {
      setEditingField(fieldName);
      setEditMode(true);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const countryCodes = [
    { value: "+1", label: "+1 (US/CA)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+91", label: "+91 (India)" },
    { value: "+86", label: "+86 (China)" },
    { value: "+81", label: "+81 (Japan)" },
    { value: "+49", label: "+49 (Germany)" },
    { value: "+33", label: "+33 (France)" },
    { value: "+61", label: "+61 (Australia)" },
  ];

  const countries = [
    "United States", "Canada", "United Kingdom", "India", "China", "Japan",
    "Germany", "France", "Australia", "Brazil", "Mexico", "Spain", "Italy",
  ];

  if (authLoading) {
	return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
				</div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Account Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            Manage your profile information and preferences
          </p>

          <div className="bg-card border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
            {/* Profile Picture Section - Gender Based Avatar */}
            <GenderAvatarDisplay 
              gender={profile?.gender || formData.gender}
              displayName={profile?.displayName || formData.displayName}
              getInitials={getInitials}
            />

            {/* Profile Form */}
            <form onSubmit={handleSave} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="displayName" className="text-sm sm:text-base">Full Name</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('displayName')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit full name"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'displayName' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      disabled={editingField !== 'displayName'}
                      className="pl-10 text-sm sm:text-base h-10 sm:h-11 disabled:bg-muted disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('email')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit email"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'email' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled={editingField !== 'email'}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 text-sm sm:text-base h-10 sm:h-11 disabled:bg-muted disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="countryCode" className="text-sm sm:text-base">Country Code</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('countryCode')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit country code"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'countryCode' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                    disabled={editingField !== 'countryCode'}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base disabled:bg-muted disabled:cursor-not-allowed">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((code) => (
                        <SelectItem key={code.value} value={code.value}>
                          {code.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('phone')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit phone number"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'phone' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="1234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={editingField !== 'phone'}
                      className="pl-10 text-sm sm:text-base h-10 sm:h-11 disabled:bg-muted disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gender" className="text-sm sm:text-base">Gender</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('gender')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit gender"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'gender' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    disabled={editingField !== 'gender'}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base disabled:bg-muted disabled:cursor-not-allowed">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="country" className="text-sm sm:text-base">Country</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('country')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit country"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'country' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <Select
                    value={formData.address.country}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, country: value },
                      })
                    }
                    disabled={editingField !== 'country'}
                  >
                    <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base disabled:bg-muted disabled:cursor-not-allowed">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="state" className="text-sm sm:text-base">State/Province</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('state')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit state"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'state' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="state"
                      type="text"
                      placeholder="California"
                      value={formData.address.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, state: e.target.value },
                        })
                      }
                      disabled={editingField !== 'state'}
                      className="pl-10 text-sm sm:text-base h-10 sm:h-11 disabled:bg-muted disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="city" className="text-sm sm:text-base">City</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('city')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit city"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'city' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="city"
                      type="text"
                      placeholder="San Francisco"
                      value={formData.address.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, city: e.target.value },
                        })
                      }
                      disabled={editingField !== 'city'}
                      className="pl-10 text-sm sm:text-base h-10 sm:h-11 disabled:bg-muted disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 col-span-1 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="street" className="text-sm sm:text-base">Street Address</Label>
                    <button
                      type="button"
                      onClick={() => toggleFieldEdit('street')}
                      className="p-1.5 rounded-md hover:bg-muted transition-colors group"
                      aria-label="Edit street address"
                    >
                      <Pencil className={`h-4 w-4 transition-colors ${editingField === 'street' ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                    </button>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="street"
                      type="text"
                      placeholder="123 Main St"
                      value={formData.address.street}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: { ...formData.address, street: e.target.value },
                        })
                      }
                      disabled={editingField !== 'street'}
                      className="pl-10 text-sm sm:text-base h-10 sm:h-11 disabled:bg-muted disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 pt-4 sm:pt-6 border-t">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={async () => {
                    try {
                      await signOutUser();
                      toast({
                        title: "Success",
                        description: "Logged out successfully",
                      });
                      router.push("/");
                    } catch (error: any) {
                      toast({
                        title: "Error",
                        description: error.message || "Failed to logout",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto order-3 sm:order-1 h-10 sm:h-11 text-sm sm:text-base"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto order-1 sm:order-2">
                  {editMode && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      className="w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600"
                    disabled={saving || !editMode}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
