import React from 'react';
import { Clock, Calendar, MapPin, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MudraIcon from '../../components/common/MudraIcon';

export default function StudentSchedule() {
  const { user } = useAuth();

  const activeBatch = user?.enrollments?.[0]?.batch || {
    name: 'Madhyama (Intermediate Jatiswaram & Shabdam)',
    instructor_name: 'Guru Nattiyakalaimani V. Suriya Sathian',
    schedule_days: 'Tue, Thu, Sat',
    schedule_time: '05:30 PM - 07:00 PM',
  };

  const weeklySchedule = [
    {
      day: 'Tuesday',
      time: '05:30 PM – 07:00 PM',
      focus: 'Aramandi Stability & Adavu Speed Drills (Tatta, Natta, Kuditta Metta)',
      room: 'Main Natya Hall (Thiruthangal)',
      guru: activeBatch.instructor_name,
    },
    {
      day: 'Thursday',
      time: '05:30 PM – 07:00 PM',
      focus: 'Jatiswaram Kalyani & Korvai Combinations with Solkattu',
      room: 'Main Natya Hall (Thiruthangal)',
      guru: activeBatch.instructor_name,
    },
    {
      day: 'Saturday',
      time: '05:30 PM – 07:00 PM',
      focus: 'Shabdam Abhinaya & Navarasa Facial Expressions + Grade Theory',
      room: 'Main Natya Hall (Thiruthangal)',
      guru: activeBatch.instructor_name,
    },
  ];

  return (
    <div className="space-y-8 font-outfit">

      {/* Header */}
      <div>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-temple-maroon">
          Class Schedule &amp; Timetable
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Weekly timetable for <strong>{activeBatch.name}</strong> at Sri Ruthraalayaa Dance Academy.
        </p>
      </div>

      {/* Timetable Cards */}
      <div className="space-y-4">
        {weeklySchedule.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border-2 border-temple-gold/40 shadow-temple flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-temple-gold transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-temple-maroon text-temple-gold flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel font-bold text-lg text-temple-maroon">
                    {item.day}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-cinzel font-semibold bg-amber-100 text-amber-800">
                    Active Session
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-1">
                  {item.time}
                </p>

                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Focus: <strong>{item.focus}</strong>
                </p>
              </div>
            </div>

            <div className="md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-stone-100 flex flex-col justify-center">
              <span className="text-xs text-stone-500 font-outfit flex items-center md:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-temple-gold" />
                {item.room}
              </span>
              <span className="text-xs text-temple-maroon font-semibold mt-1">
                Instructor: {item.guru}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Classroom Etiquette & Guidelines Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-white border border-temple-gold/60 shadow-temple space-y-4">
        <h3 className="font-cinzel font-bold text-base text-temple-maroon flex items-center gap-2">
          <MudraIcon name="nataraja" className="w-5 h-5 text-temple-gold" />
          Traditional Studio Etiquette (Guru-Shishya Code)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-temple-maroon flex-shrink-0 mt-0.5" />
            <span>Arrive 10 minutes prior to session for mandatory Aramandi warm-ups and Dhyana Shloka.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-temple-maroon flex-shrink-0 mt-0.5" />
            <span>Attire: Cotton practice dance saree or comfortable ethnic salwar with dupatta securely pinned.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-temple-maroon flex-shrink-0 mt-0.5" />
            <span>Carry leather-padded Salangai bells, theoretical notebook, and water bottle to all weekend classes.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-temple-maroon flex-shrink-0 mt-0.5" />
            <span>Perform Namaskaram to Mother Earth, Nataraja, and Guru before stepping onto and off the dance floor.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
