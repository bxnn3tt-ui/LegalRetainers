import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
const practiceAreas = ['Personal Injury', 'Medical Malpractice', 'Workers\' Compensation', 'Mass Tort', 'Other'];
const lawFirmLeadSchema = z.object({
  firmName: z.string().trim().min(2, {
    message: "Firm name is required"
  }).max(100),
  contactName: z.string().trim().min(2, {
    message: "Your name is required"
  }).max(100),
  email: z.string().trim().email({
    message: "Valid email address is required"
  }).max(255),
  phone: z.string().trim().min(10, {
    message: "Valid phone number is required"
  }).max(20),
  practiceAreas: z.array(z.string()).min(1, {
    message: "Select at least one practice area"
  }),
  caseVolume: z.string().min(1, {
    message: "Please select your monthly case volume"
  }),
  challenge: z.string().trim().max(500).optional()
});
type LawFirmLeadFormData = z.infer<typeof lawFirmLeadSchema>;
export const LawFirmLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    toast
  } = useToast();
  const form = useForm<LawFirmLeadFormData>({
    resolver: zodResolver(lawFirmLeadSchema),
    defaultValues: {
      firmName: '',
      contactName: '',
      email: '',
      phone: '',
      practiceAreas: [],
      caseVolume: '',
      challenge: ''
    }
  });
  const onSubmit = async (data: LawFirmLeadFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-law-firm-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit');
      toast({
        title: "Thank you!",
        description: "We'll contact you within 24 hours to schedule your demo."
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting law firm lead:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at demo@legalretainers.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <Card className="mt-12 p-8 border-2 border-border rounded-none max-w-2xl">
      <div className="flex items-start gap-3 mb-6">
        
        <div>
          <h2 className="lr-heading-l mb-2">Grow Your Practice with Better Retainers</h2>
          <p className="lr-body text-muted-foreground">Get more signed clients without adding staff. See how law firms use our platform to scale intake and simplify case acquisition.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Firm Name */}
          <FormField control={form.control} name="firmName" render={({
          field
        }) => <FormItem>
                <FormLabel>Law Firm Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Smith & Associates Legal" className="rounded-none border-2" aria-required="true" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          {/* Contact Name */}
          <FormField control={form.control} name="contactName" render={({
          field
        }) => <FormItem>
                <FormLabel>Your Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Smith" className="rounded-none border-2" aria-required="true" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          {/* Email */}
          <FormField control={form.control} name="email" render={({
          field
        }) => <FormItem>
                <FormLabel>Email Address *</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="john@smithlegal.com" className="rounded-none border-2" aria-required="true" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          {/* Phone */}
          <FormField control={form.control} name="phone" render={({
          field
        }) => <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" placeholder="(555) 123-4567" className="rounded-none border-2" aria-required="true" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          {/* Practice Areas */}
          <FormField control={form.control} name="practiceAreas" render={() => <FormItem>
                <FormLabel>Practice Areas (select all that apply) *</FormLabel>
                <div className="space-y-3 mt-2">
                  {practiceAreas.map(area => <FormField key={area} control={form.control} name="practiceAreas" render={({
              field
            }) => <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value?.includes(area)} onCheckedChange={checked => {
                  const updatedValue = checked ? [...(field.value || []), area] : (field.value || []).filter(value => value !== area);
                  field.onChange(updatedValue);
                }} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {area}
                          </FormLabel>
                        </FormItem>} />)}
                </div>
                <FormMessage />
              </FormItem>} />

          {/* Case Volume */}
          <FormField control={form.control} name="caseVolume" render={({
          field
        }) => <FormItem>
                <FormLabel>Monthly Case Volume *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-none border-2" aria-required="true">
                      <SelectValue placeholder="Select volume" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 cases</SelectItem>
                    <SelectItem value="11-25">11-25 cases</SelectItem>
                    <SelectItem value="26-50">26-50 cases</SelectItem>
                    <SelectItem value="51-100">51-100 cases</SelectItem>
                    <SelectItem value="100+">100+ cases</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          {/* Challenge */}
          <FormField control={form.control} name="challenge" render={({
          field
        }) => <FormItem>
                <FormLabel>What's your biggest intake challenge? (optional)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Tell us about your biggest pain point..." className="rounded-none border-2 min-h-[100px]" maxLength={500} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          {/* Submit Button */}
          <Button type="submit" variant="lr" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Find Out How'}
          </Button>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground justify-center items-center pt-2">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>Pay only per signed case</span>
            </div>
          </div>
        </form>
      </Form>
    </Card>;
};