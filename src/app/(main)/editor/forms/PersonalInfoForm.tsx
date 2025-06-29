// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { EditorFormProps } from "@/lib/types";
// import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";

// export default function PersonalInfoForm({
//   resumeData,
//   setResumeData,
// }: EditorFormProps) {
//   const form = useForm<PersonalInfoValues>({
//     resolver: zodResolver(personalInfoSchema),
//     defaultValues: {
//       firstName: resumeData.firstName || "",
//       lastName: resumeData.lastName || "",
//       jobTitle: resumeData.jobTitle || "",
//       city: resumeData.city || "",
//       country: resumeData.country || "",
//       phone: resumeData.phone || "",
//       email: resumeData.email || "",
//     },
//   });

//   useEffect(() => {
//     const { unsubscribe } = form.watch(async (values) => {
//       const isValid = await form.trigger();
//       if (!isValid) return;
//       setResumeData({ ...resumeData, ...values });
//     });
//     return unsubscribe;
//   }, [form, resumeData, setResumeData]);

//   const photoInputRef = useRef<HTMLInputElement>(null);

//   return (
//     <div className="mx-auto max-w-xl space-y-6">
//       <div className="space-y-1.5 text-center">
//         <h2 className="text-2xl font-semibold">Personal info</h2>
//         <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
//       </div>
//       <Form {...form}>
//         <form className="space-y-3">
//           <FormField
//             control={form.control}
//             name="photo"
//             render={({ field: { value, ...fieldValues } }) => (
//               <FormItem>
//                 <FormLabel>Your photo</FormLabel>
//                 <div className="flex items-center gap-2">
//                   <FormControl>
//                     <Input
//                       {...fieldValues}
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         fieldValues.onChange(file);
//                       }}
//                       ref={photoInputRef}
//                     />
//                   </FormControl>
//                   <Button
//                     variant="secondary"
//                     type="button"
//                     onClick={() => {
//                       fieldValues.onChange(null);
//                       if (photoInputRef.current) {
//                         photoInputRef.current.value = "";
//                       }
//                     }}
//                   >
//                     Remove
//                   </Button>
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="grid grid-cols-2 gap-3">
//             <FormField
//               control={form.control}
//               name="firstName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>First name</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lastName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Last name</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormField
//             control={form.control}
//             name="jobTitle"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Job title</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="grid grid-cols-2 gap-3">
//             <FormField
//               control={form.control}
//               name="city"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>City</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="country"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Country</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone</FormLabel>
//                 <FormControl>
//                   <Input {...field} type="tel" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input {...field} type="email" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>
//     </div>
//   );
// }

import React, { useCallback, useRef } from "react"; // Add React and useCallback import
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PersonalInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
      // photo: resumeData.photo || undefined,
    },
  });

  const photoInputRef = useRef<HTMLInputElement>(null);

  // Memoize the handler to update parent state
  const handleFieldChange = useCallback(
    async (field: keyof PersonalInfoValues, value: string | File | null) => {
      const values = form.getValues();
      const updatedValues = { ...values, [field]: value };
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...updatedValues });
    },
    [form, resumeData, setResumeData],
  );

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal info</h2>
        <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            // render={({ field: { value: _value, ...fieldValues } }) => (
            //   <FormItem>
            //     <FormLabel>Your photo</FormLabel>
            //     <div className="flex items-center gap-2">
            //       <FormControl>
            //         <Input
            //           {...fieldValues}
            //           type="file"
            //           accept="image/*"
            //           onChange={(e) => {
            //             const file = e.target.files?.[0];
            //             fieldValues.onChange(file);
            //             handleFieldChange("photo", file || null);
            //           }}
            //           ref={photoInputRef}
            //         />
            //       </FormControl>
            //       <Button
            //         variant="secondary"
            //         type="button"
            //         onClick={() => {
            //           fieldValues.onChange(null);
            //           handleFieldChange("photo", null);
            //           if (photoInputRef.current) {
            //             photoInputRef.current.value = "";
            //           }
            //         }}
            //       >
            //         Remove
            //       </Button>
            //     </div>
            //     <FormMessage />
            //   </FormItem>
            // )}

            render={({ field: { onChange, name, onBlur } }) => (
              <FormItem>
                <FormLabel>Your photo</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      name={name}
                      onBlur={onBlur}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                        handleFieldChange("photo", file || null);
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      onChange(null);
                      handleFieldChange("photo", null);
                      if (photoInputRef.current) {
                        photoInputRef.current.value = "";
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("firstName", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("lastName", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("jobTitle", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("city", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("country", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("phone", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("email", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
