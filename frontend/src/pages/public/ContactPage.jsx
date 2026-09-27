import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
import TempleBorder from '../../components/common/TempleBorder';
import KolamDivider from '../../components/common/KolamDivider';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  level: z.string().default('Beginner'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    // In production, posts to backend enquiry or sends email
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
  };

  return (
    <div className="contact-page bg-[#0f0f0f] text-[#bdbdbd] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-[3px] text-[#d4af37] px-3 py-1.5 rounded-full bg-[#111111] border border-[#333333]">
            Get in Touch
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-white mt-3">
            Contact Sri <span className="text-[#d4af37]">Ruthraalayaa</span>
          </h1>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#aaaaaa] mt-2">
            Visit our studio in Thiruthangal near Sivakasi or send us an enquiry for admissions
          </p>
        </div>

        <TempleBorder />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-12">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#111111] rounded-2xl border border-[#333333] p-8 sm:p-10 shadow-xl">
            <h2 className="font-cinzel font-bold text-2xl text-white mb-2">
              Send an Enquiry / <span className="text-[#d4af37]">Trial Request</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#aaaaaa] font-outfit mb-6">
              Interested in joining a batch or scheduling an observation session with Guru V. Suriya Sathian? Fill out the details below.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-[#0f0f0f] border border-[#d4af37] text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-[#d4af37] mx-auto" />
                <h3 className="font-cinzel font-bold text-lg text-white">
                  Enquiry Received with Namaskaram!
                </h3>
                <p className="text-xs sm:text-sm text-[#bdbdbd] font-outfit max-w-md mx-auto">
                  Thank you for reaching out to Sri Ruthralaya. Our academy administration will contact you within 24 hours via phone or WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-5 py-2 rounded-md bg-[#d4af37] text-[#111111] text-xs font-cinzel font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="contact-form space-y-4 font-outfit">
                <div>
                  <label className="block text-xs font-semibold text-[#dddddd] mb-1.5 font-cinzel">
                    Student / Parent Name *
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="e.g. Ananya Ramachandran"
                    className="w-full px-4 py-3 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#dddddd] mb-1.5 font-cinzel">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="e.g. ananya@gmail.com"
                      className="w-full px-4 py-3 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#dddddd] mb-1.5 font-cinzel">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="e.g. 98421 23456"
                      className="w-full px-4 py-3 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#dddddd] mb-1.5 font-cinzel">
                    Interest Level
                  </label>
                  <select
                    {...register('level')}
                    className="w-full px-4 py-3 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white"
                  >
                    <option value="Beginner" className="bg-[#0f0f0f]">Bala Natya (Beginner - Age 5+)</option>
                    <option value="Intermediate" className="bg-[#0f0f0f]">Madhyama (Intermediate / Adavus completed)</option>
                    <option value="Advanced" className="bg-[#0f0f0f]">Visharada (Advanced Varnam &amp; Margam)</option>
                    <option value="Arangetram" className="bg-[#0f0f0f]">Arangetram Solo Debut Preparation</option>
                    <option value="General" className="bg-[#0f0f0f]">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#dddddd] mb-1.5 font-cinzel">
                    Your Message / Query *
                  </label>
                  <textarea
                    rows={4}
                    {...register('message')}
                    placeholder="Tell us about student's age, past dance experience, or specific batch timing preferences..."
                    className="w-full px-4 py-3 rounded-md border border-[#333333] text-xs sm:text-sm focus:outline-none focus:border-[#d4af37] bg-[#0f0f0f] text-white placeholder-[#555555]"
                  ></textarea>
                  {errors.message && <p className="text-[11px] text-red-400 mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-md bg-[#d4af37] text-[#111111] hover:bg-transparent hover:text-[#d4af37] border border-[#d4af37] text-xs sm:text-sm font-cinzel font-bold shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Admission Enquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Location, Map & Hours */}
          <div className="contact-info lg:col-span-5 space-y-6">
            
            {/* Info Card */}
            <div className="bg-[#111111] rounded-2xl border border-[#333333] p-8 shadow-xl space-y-6">
              <h3 className="font-cinzel font-bold text-xl text-[#d4af37] border-b border-[#333333] pb-3">
                Academy Location &amp; Contact
              </h3>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-[#0f0f0f] text-[#d4af37] border border-[#333333] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-white uppercase">Academy Address</h4>
                  <p className="text-xs sm:text-sm text-[#bbbbbb] mt-1 leading-relaxed">
                    Sri Ruthraalayaa Temple Dance Hall, Main Road,<br />
                    Thiruthangal near Sivakasi, Virudhunagar District,<br />
                    Tamil Nadu — 626130.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-[#0f0f0f] text-[#d4af37] border border-[#333333] flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-white uppercase">Direct Helpline</h4>
                  <a href="tel:+919842123456" className="text-xs sm:text-sm text-[#d4af37] font-semibold hover:underline block mt-1">
                    +91 98421 23456
                  </a>
                  <p className="text-[11px] text-[#777777]">Guru V. Suriya Sathian / Academy Office</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-[#0f0f0f] text-[#d4af37] border border-[#333333] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-xs font-bold text-white uppercase">Studio Visiting Hours</h4>
                  <p className="text-xs sm:text-sm text-[#bbbbbb] mt-1">
                    <strong className="text-white">Mon – Fri:</strong> 04:30 PM – 07:30 PM<br />
                    <strong className="text-white">Sat – Sun:</strong> 08:00 AM – 11:30 AM &amp; 04:00 PM – 07:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Card */}
            <div className="rounded-2xl overflow-hidden border border-[#333333] shadow-xl bg-[#111111]">
              <iframe
                title="Sri Ruthralaya Dance Academy Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.5681657803387!2d77.80164627478442!3d9.379762490696956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf72eb71f0ff%3A0x6b4f74d0e9a4d8c!2sThiruthangal%2C%20Sivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
