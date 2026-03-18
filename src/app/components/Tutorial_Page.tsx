import React, { useState, useEffect, useRef,useCallback } from 'react';
import ReactDOM from 'react-dom';
import {
  UserPlus,
  Settings,
  Shield,
  CreditCard,
  ArrowRight,
  CheckCircle,
  MapPin,
  MapPinned,
  Navigation,
  Users,
  FileText,
  CheckCircle2,
  UserCircle,
  Route,
  Activity,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Grid3X3, 
  List,
  ZoomIn,
  X,

} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import logoImage from "../../assets/GeoTrack_Icon.png";

import app_launch from "../../assets/app_launch.png";
import login from "../../assets/login.png";
import access from "../../assets/access.png";
import allow from "../../assets/allow.png";
import map_screen from "../../assets/map_screen.png";
import start_meeting from "../../assets/start_meeting.png";
import meeting_notes from "../../assets/meeting_notes.png";
import end_meeting from "../../assets/end_meeting.png";
import client_details from "../../assets/client_details.png";
import focus_marker from "../../assets/focus_marker.png";
import client_screen from "../../assets/client_screen.png";
import add_client from "../../assets/add_client.png";
import activity from "../../assets/activity.png";
import profile_screen from "../../assets/profile_screen.png";
import sign_out from "../../assets/sign_out.png";
import trip_details from "../../assets/trip_details.png";
import single_leg_1 from "../../assets/single_leg_1.png";
import single_leg_2 from "../../assets/single_leg_2.png";
import single_leg_3 from "../../assets/single_leg_3.png";
import multi_leg_trip_1 from "../../assets/multi_leg_trip_1.png";
import multi_leg_trip_2 from "../../assets/multi_leg_trip_2.png";
import multi_leg_trip_3 from "../../assets/multi_leg_trip_3.png";
import meeting_details from "../../assets/meeting_details.png";

import TutorialVideo from '../components/TutorialVideo';
import { Footer } from '../components/Footer';

interface TutorialStep {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  image?: string;
  images?: string[];
  multiImages?: boolean;
  details: (string | { message: string; reason: string })[];
  warning?: { title: string; points: string[] };
}

interface TutorialSection {
  sectionId: number;
  sectionTitle: string;
  sectionDescription: string;
  steps: TutorialStep[];
  sectionColor?: string;
}

const tutorialSections: TutorialSection[] = [
  {
    sectionId: 1,
    sectionTitle: '1. Sign-In & Account Creation',
    sectionDescription: 'Get started by creating your account and setting up your profile',
    steps: [
      {
        number: 1,
        title: 'Launch the Application',
        description: 'Open the GeoTrack app on your mobile device.',
        icon: UserPlus,
        iconColor: '#3B82F6',
        image: app_launch,
        details: [
         'Locate the GeoTrack app icon on your device',
          'App loads to secure login screen',
          'System checks device compatibility automatically',
],
      },
      {
        number: 2,
        title: 'Sign In / Sign Up',
        description: 'Enter the domain email ID provided by the admin (Example: username@companydomain.com) and password. Tap Sign In.',
        details: [
          'Enter admin-provided domain email',
          'Enter password',
          'For new users, select Create Account',
          'Sign-up allowed only with admin-approved domain email',
        ],
        warning: {
          title: 'Email & Domain Validation Rules',
          points: [
            'Generic email services (Gmail, Yahoo, Outlook) are detected as Trial Accounts',
            'Trial users can only view the app - core features disabled',
            'Admin-approved domain email is mandatory',
          ],
        },
        icon: Shield,
        iconColor: '#1D4ED8',
        image: login,
      },
      {
        number: 3,
        title: 'Background Location Access',
        description: 'After successful sign-in, the app will request background location permission.',
        details: [
          'Show nearby clients',
          'Track visit history',
          'Verify your working area automatically',
        ],
        icon: MapPin,
        iconColor: '#06B6D4',
        image: access,
      },
    ],
  },
  {
    sectionId: 2,
    sectionTitle: '2. Permission Setup',
    sectionDescription: 'Allow necessary permissions for seamless app functionality',
    steps: [
      {
        number: 4,
        title: 'Allow Required Services',
        description: 'To ensure smooth functioning, allow the following permissions:',
        details: [
          'Location (Always Allow)',
          'Camera (for document & card scanning)',
          'Gallery (file attachments)',
          'Notifications (meeting & trip alerts)',
          'Storage (receipts & notes)',
        ],
        warning: {
          title: 'Important',
          points: ['Without these permissions, some features may not work correctly.'],
        },
        icon: Settings,
        iconColor: '#22C55E',
        image: allow,
      },
    ],
  },
  {
    sectionId: 3,
    sectionTitle: '3. Map Screen & Client Tracking',
    sectionDescription: 'View your location and track nearby clients on the map',
    steps: [
      {
        number: 5,
        title: 'View Your Location & Nearby Clients',
        description: 'The map displays your current location. Nearby clients are shown using colored markers.',
        details: [
          'Red – Client not visited',
          'Green – Client visited',
        ],
        icon: MapPinned,
        iconColor: '#F97316',
        image: map_screen,
      },
      {
        number: 6,
        title: 'Click on Client Marker',
        description: 'On tapping a client marker, you can view client details and start a meeting with the client.',
        details: [
   'View client address and last interaction time',
  'Start Meeting option available to initiate a meeting',
  'Mark visit status instantly from the action menu',
  'Update client status (Met Successfully / Not Available / Office Closed / Spoke on Phone)',
  
],
        icon: Navigation,
        iconColor: '#EF4444',
        image: start_meeting,
      },
    ],
  },
  {
    sectionId: 4,
    sectionTitle: '4. Meeting Management',
    sectionDescription: 'Start, manage, and complete client meetings efficiently',
    steps: [
      {
        number: 7,
        title: 'Start Meeting',
        description: 'When Start Meeting is selected, view client location, phone number, meeting start time & duration.',
        details: [
          'Active – Client discussion in progress',
          'Completed – Client interested / deal done',
          'Inactive – Client not interested',
        ],
        icon: Users,
        iconColor: '#A855F7',
        image: meeting_details,
      },
      {
        number: 8,
        title: 'During the Meeting',
        description: 'Add meeting notes, attach documents, images, or files, and update meeting outcomes in real time.',
        details: [
  'Add meeting notes in the provided text area',
  'Attach images, documents, or files using Add Files option',
  'View uploaded attachments before ending the meeting',
  'Update client discussion details in real time',

],
        icon: FileText,
        iconColor: '#4F46E5',
        image: meeting_notes,
      },
      {
        number: 9,
        title: 'End Meeting',
        description: 'Tap End Meeting. Client status automatically updates from Active → Inactive/Completed. Notes and attachments are securely saved.',
        details: ['Tap End Meeting once the discussion with the client is completed',
                  'A confirmation prompt appears to ensure the meeting is being closed intentionally',
                  'All meeting notes, attachments, and updates are securely saved in the system'
        ],
        icon: CheckCircle2,
        iconColor: '#22C55E',
        image: end_meeting,
      },
    ],
  },
  {
    sectionId: 5,
    sectionTitle: '5. Client Detail View',
    sectionDescription: 'Access complete client information and history',
    steps: [
      {
        number: 10,
        title: 'View Client Details',
        description: 'From the client screen or map, view client status, last visited date & history, contact information (Email, Address, Coordinates), meeting notes & attachments, and client location highlighted on the map.',
        details: [ 'View complete client profile including current status (Active, Inactive, Completed)',
                  'Displays last visited date and visit history for performance tracking',
                  'Access previously saved meeting notes and attachments',
                  'Shows Contact Information',
        ], 
        icon: UserCircle,
        iconColor: '#3B82F6',
        image: client_details,
      },
    ],
  },
  {
    sectionId: 6,
    sectionTitle: '6. Trip & Expense Management',
    sectionDescription: 'Track your trips and manage expenses efficiently',
    steps: [
      {
        number: 11,
        title: 'Choose Trip Type',
        description: 'Select between Single Trip (one-way journey, single transport mode) or Multi-Leg Trip (multiple journeys, different transport modes in one trip).',
        details: ['Select between-Single Trip – One-way journey using a single transport mode',
                  'Multi-Leg Trip – Multiple journeys using different transport modes within one trip',
                  'Helps organize travel records systematically',
                  'Provides structured expense tracking for reimbursement and reporting purposes'
                ],
        icon: Route,
        iconColor: '#22C55E',
        image: trip_details
      },
      {
        number: 12,
        title: 'Single Trip Entry',
        description: 'Fill in start location, end location, date & time, distance, transport mode (Bus/Train/Bike/Rickshaw), expense details, and upload receipts.',
        details: [
          'Start & end location',
          'Date & time',
          'Distance',
          'Transport mode',
          'Amount spent',
          'Upload receipts',
        ],
        icon: MapPin,
        iconColor: '#0D9488',
        multiImages: true,
        images: [single_leg_1, single_leg_2, single_leg_3],
      },
      {
        number: 13,
        title: 'Multi-Leg Trip Entry',
        description: 'Enter trip name, multiple journey legs with start/end location, distance, transport mode, amount spent, notes, and attach receipts. View total legs, distance, and expense amount.',
        details: [
          'Start & end location',
          'Trip name & multiple journey legs',
          'Transport mode',
          'Amount spent',
          'View total legs & expense amount',
        ],
        icon: CreditCard,
        iconColor: '#F97316',
        multiImages: true,
        images: [multi_leg_trip_1, multi_leg_trip_2, multi_leg_trip_3],
      },
    ],
  },
  {
    sectionId: 7,
    sectionTitle: '7. Client Marker Status on Map',
    sectionDescription: 'Client markers on map indicate visit status and priority.',
    steps: [
      {
        number: 14,
        title: 'Client Marker Status on Map',
        description: 'Client markers on map indicate visit status and priority.',
        details: [
          'Red – Never visited (shows client count)',
          'Green – Recently visited (shows visit count)',
          'Yellow – Follow-up required soon',
          'Orange – Overdue visit',
        ],
        icon: MapPin,
        iconColor: '#EF4444',
        image: focus_marker,
      },
    ],
  },
  {
    sectionId: 8,
    sectionTitle: '8. Client Screen',
    sectionDescription: 'Manage and organize all your clients in one place',
    steps: [
      {
        number: 15,
        title: 'View All Clients',
        description: 'Clients are categorized as All, Active, Inactive, and Completed. Search by name, sort by distance, and filter by status.',
        details: [
          'Search by client name',
          'Sort by nearest distance',
          'Filter by client status',
          'View client name, email, phone, distance',
        ],
        icon: Users,
        iconColor: '#A855F7',
        image: client_screen,
      },
      {
        number: 16,
        title: 'Add New Client',
        description: 'Tap Add Client and choose Quick Fill (scan business card to auto-populate) or Manual Entry (client name, phone, email, address, pincode, notes).',
        details: [
          'Enter client details including name, phone number, email, address, pincode, and optional notes',
          'Save to instantly include the client in map tracking and visit management'
        ],
        icon: UserPlus,
        iconColor: '#4F46E5',
        image: add_client,
      },
    ],
  },
  {
    sectionId: 9,
    sectionTitle: '9. Activity Screen',
    sectionDescription: 'Track all your activities and movements',
    steps: [
      {
        number: 17,
        title: 'View Activity Logs',
        description: 'Displays total number of activities, date & time, latitude & longitude, location coordinates, and distance traveled.',
        details: [
          'Access a complete timeline of user activity logs',
          'Track movement history and field activity in a structured format for monitoring and reporting purposes'
        ],
        icon: Activity,
        iconColor: '#3B82F6',
        image: activity,
      },
    ],
  },
  {
    sectionId: 10,
    sectionTitle: '10. Profile & Settings',
    sectionDescription: 'Manage your account preferences and information',
    steps: [
      {
        number: 18,
        title: 'Profile Information',
        description: 'View & edit profile name, User/Employee ID, and view total expenses incurred.',
        details: [
          'View and edit your name and profile details',
          'View total expense summary at a glance',
          'Toggle background location tracking',
          
],
        icon: UserCircle,
        iconColor: '#22C55E',
        image: profile_screen,
      },
      {
        number: 19,
        title: 'Account Settings',
        description: 'Enable/disable background location tracking, view registered email and member since date. Tap Sign Out to exit the app securely.',
        details: [
          'View registered email and account details',
          'Check membership information',
          'Manage app preferences and privacy settings',
          
],
        icon: Settings,
        iconColor: '#10B981',
        image: sign_out,
      },
    ],
  },
];

const BRAND = {
  primary:   '#06B6D4',
  primaryLt: '#38BDF8',
  primaryDk: '#0891B2',
  accent:    '#7C3AED',
  dark:      '#0F172A',
  mid:       '#1E293B',
  surface:   '#F0FDFF',
  slate:     '#475569',
  muted:     '#94A3B8',
  success:   '#10B981',
  amber:     '#F59E0B',
  border:    'rgba(6,182,212,0.18)',
}
 

const ALL_STEPS : any[] = tutorialSections.flatMap(s => s.steps)
const TOTAL_STEPS = ALL_STEPS.length

/* ─── ZOOM MODAL ─── */
interface ZoomModalProps { show: boolean; onClose: () => void; step: any; isMobile: boolean }
const ZoomModal = ({ show, onClose, step, isMobile }: ZoomModalProps) => {
  useEffect(() => {
    if (!show) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [show, onClose])

  if (!step) return null

  return ReactDOM.createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          key="zoom-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '1.5rem',
          }}
        >
          <motion.div
            key="zoom-panel"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(10,15,30,0.95)',
              borderRadius: '24px', padding: '2rem',
              width: '100%', maxWidth: '1100px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1.25rem',
              position: 'relative', cursor: 'default',
              boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${step.iconColor}25`,
              border: `1px solid ${step.iconColor}20`,
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close zoom"
              style={{
                position: 'absolute', top: '14px', right: '14px',
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            >
              <X size={16} strokeWidth={2.5} />
            </button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '5px 14px 5px 5px', borderRadius: 999,
              background: `${step.iconColor}18`, border: `1px solid ${step.iconColor}35`,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: step.iconColor, color: '#fff',
                display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700,
              }}>
                {step.number}
              </div>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{step.title}</span>
            </div>
            <img
              src={step.image} alt={step.title}
              style={{
                maxWidth: '100%', maxHeight: '78vh',
                objectFit: 'contain', borderRadius: '12px',
                display: 'block', margin: '0 auto',
                border: `2px solid ${step.iconColor}25`,
              }}
            />
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', margin: 0 }}>
              {isMobile ? 'Tap outside to close' : 'Click outside or press Esc to close'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

/* ─── INDEX SIDEBAR ─── */
interface IndexSidebarProps { activeGlobalIdx: number; onJump: (idx: number) => void; isMobile?: boolean; isOpen: boolean; onToggle: () => void; footerOffset: number }
const IndexSidebar = ({ activeGlobalIdx, onJump, isOpen, onToggle, footerOffset }: IndexSidebarProps) => {
  const SIDEBAR_W = 272

  const [openSections, setOpenSections] = useState<Record<number, boolean>>(() => {
    const map: Record<number, boolean> = {}
    tutorialSections.forEach(s => { map[s.sectionId] = false })
    const active = tutorialSections.find(s =>
      s.steps.some((st: TutorialStep) => ALL_STEPS.findIndex((x: TutorialStep) => x.number === st.number) === activeGlobalIdx)
    )
    if (active) map[active.sectionId] = true
    return map
  })

  const toggleSection = (id: number) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <>
      {isOpen && (
        <motion.div
          animate={{ x: isOpen ? 0 : -SIDEBAR_W }}
          initial={false}
          transition={{ type: 'spring', stiffness: 340, damping: 34 }}
          style={{
            position: 'fixed', left: 0, top: 0, bottom: footerOffset,
            width: `${SIDEBAR_W}px`, zIndex: 500,
            background: '#ffffff', borderRight: '1px solid #E8F4F8',
            boxShadow: '6px 0 32px rgba(6,182,212,0.07), 2px 0 8px rgba(0,0,0,0.04)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          <div style={{
            background: `linear-gradient(135deg, ${BRAND.primary}08, ${BRAND.primaryLt}05)`,
            padding: '1rem 1rem 0.85rem 1.1rem', borderBottom: '1px solid #EEF7FB',
            flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDk})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 3px 10px ${BRAND.primary}40`, flexShrink: 0,
              }}>
                <List size={13} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: BRAND.dark, fontFamily: '"Inter", sans-serif', lineHeight: 1 }}>Tutorial Index</div>
                <div style={{ fontSize: '10px', color: BRAND.muted, marginTop: '2px', fontFamily: '"Inter", sans-serif' }}>{tutorialSections.length} sections · {ALL_STEPS.length} steps</div>
              </div>
            </div>
            <motion.button
              onClick={onToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              style={{ width: '28px', height: '28px', borderRadius: '7px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              <ChevronLeft size={14} color={BRAND.muted} strokeWidth={2.5} />
            </motion.button>
          </div>

          <div style={{ padding: '0.7rem 1.1rem 0.65rem', borderBottom: '1px solid #F0F7FA', flexShrink: 0, background: '#FAFCFE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: BRAND.muted, fontFamily: '"Inter", sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Progress</span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: BRAND.primary, fontFamily: '"Inter", sans-serif', background: `${BRAND.primary}12`, padding: '1px 7px', borderRadius: '999px', border: `1px solid ${BRAND.primary}25` }}>{activeGlobalIdx + 1} / {ALL_STEPS.length}</span>
            </div>
            <div style={{ height: '5px', background: '#EEF2F7', borderRadius: '5px', overflow: 'hidden' }}>
              <motion.div
                animate={{ width: `${((activeGlobalIdx + 1) / ALL_STEPS.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                style={{ height: '100%', background: `linear-gradient(to right, ${BRAND.primary}, ${BRAND.primaryLt})`, borderRadius: '5px', boxShadow: `0 0 6px ${BRAND.primary}50` }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0.5rem 0 1rem' }}>
            <style>{`.sb-sec-btn:hover{background:rgba(6,182,212,0.04)!important}.sb-step-btn:hover{background:rgba(6,182,212,0.05)!important}`}</style>
            {tutorialSections.map((section, secIdx) => {
              const secFirstIdx = ALL_STEPS.findIndex((s: any)=> s.number === section.steps[0].number)
              const isSectionActive = activeGlobalIdx >= secFirstIdx && activeGlobalIdx < secFirstIdx + section.steps.length
              const isExpanded = !!openSections[section.sectionId]
              const completedInSection = section.steps.filter((st: any) => ALL_STEPS.findIndex(x => x.number === st.number) < activeGlobalIdx).length
              const sectionColor = (section as any).sectionColor || BRAND.primary
              return (
                <div key={section.sectionId} style={{ marginBottom: '2px' }}>
                  <button
                    className="sb-sec-btn"
                    onClick={() => toggleSection(section.sectionId)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
                      padding: '0.5rem 0.9rem 0.5rem 0.8rem',
                      background: isSectionActive ? `${sectionColor}07` : 'transparent',
                      borderLeft: `3px solid ${isSectionActive ? sectionColor : 'transparent'}`,
                      border: 'none', borderLeftStyle: 'solid', cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.18s ease, border-color 0.18s ease',
                    }}
                  >
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0,
                      background: isSectionActive ? `linear-gradient(135deg, ${sectionColor}, ${sectionColor}bb)` : '#EEF2F7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: isSectionActive ? `0 2px 6px ${sectionColor}40` : 'none',
                      transition: 'all 0.22s ease',
                    }}>
                      <span style={{ fontSize: '8px', fontWeight: 800, color: isSectionActive ? 'white' : BRAND.muted, fontFamily: '"Inter", sans-serif' }}>{String(secIdx + 1).padStart(2, '0')}</span>
                    </div>
                    <span style={{ flex: 1, fontSize: '10.5px', fontWeight: 700, color: isSectionActive ? sectionColor : '#64748B', fontFamily: '"Inter", sans-serif', lineHeight: 1.25, letterSpacing: '0.01em', transition: 'color 0.18s ease' }}>{section.sectionTitle}</span>
                    {completedInSection > 0 && (
                      <span style={{ fontSize: '8.5px', fontWeight: 700, color: sectionColor, background: `${sectionColor}12`, padding: '1px 5px', borderRadius: '999px', border: `1px solid ${sectionColor}25`, flexShrink: 0, fontFamily: '"Inter", sans-serif' }}>{completedInSection}/{section.steps.length}</span>
                    )}
                    <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.18 }} style={{ display: 'flex', flexShrink: 0 }}>
                      <ChevronRight size={11} color={isSectionActive ? sectionColor : '#94A3B8'} strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="sec-steps"
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ margin: '2px 0.6rem 4px 1.7rem', borderLeft: `1.5px solid ${sectionColor}25` }}>
                          {section.steps.map((step, stepLocalIdx) => {
                            const stepIdx = ALL_STEPS.findIndex((s: any)=> s.number === step.number)
                            const isActive = stepIdx === activeGlobalIdx
                            const isPast = stepIdx < activeGlobalIdx
                            const isLast = stepLocalIdx === section.steps.length - 1
                            return (
                              <motion.button
                                key={step.number}
                                className="sb-step-btn"
                                onClick={() => onJump(stepIdx)}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.55rem',
                                  padding: '0.38rem 0.6rem 0.38rem 0.85rem',
                                  background: isActive ? `linear-gradient(90deg, ${step.iconColor}10, transparent)` : 'transparent',
                                  border: 'none', cursor: 'pointer', textAlign: 'left',
                                  borderRadius: '0 8px 8px 0', position: 'relative',
                                  transition: 'background 0.15s ease', marginBottom: isLast ? 0 : '1px',
                                }}
                              >
                                {isActive && (
                                  <div style={{ position: 'absolute', left: '-1px', top: '18%', bottom: '18%', width: '2.5px', borderRadius: '0 2px 2px 0', background: step.iconColor, boxShadow: `0 0 5px ${step.iconColor}70` }} />
                                )}
                                <div style={{
                                  width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0, zIndex: 1,
                                  background: isActive ? step.iconColor : isPast ? `${step.iconColor}15` : '#F1F5F9',
                                  border: isActive ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}50` : '1.5px solid #DDE4EE',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  boxShadow: isActive ? `0 2px 8px ${step.iconColor}45` : 'none', transition: 'all 0.2s ease',
                                }}>
                                  {isPast ? (
                                    <CheckCircle size={11} color={step.iconColor} strokeWidth={2.5} />
                                  ) : (
                                    <span style={{ fontSize: '8px', fontWeight: 800, color: isActive ? 'white' : '#94A3B8', fontFamily: '"Inter", sans-serif' }}>{step.number}</span>
                                  )}
                                </div>
                                <span style={{
                                  flex: 1, fontSize: '11.5px',
                                  fontWeight: isActive ? 650 : isPast ? 500 : 450,
                                  color: isActive ? BRAND.dark : isPast ? '#4B5563' : '#94A3B8',
                                  lineHeight: 1.3, fontFamily: '"Inter", sans-serif',
                                  transition: 'color 0.15s ease', whiteSpace: 'nowrap',
                                  overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>{step.title}</span>
                                {isActive && (
                                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: step.iconColor, flexShrink: 0, boxShadow: `0 0 4px ${step.iconColor}80` }} />
                                )}
                              </motion.button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </>
  )
}

/* ─── STEP CARD ─── */
interface StepCardProps { step: any; isMobile: boolean; isTablet: boolean; globalIdx: number; canPrev: boolean; canNext: boolean; onPrev: () => void; onNext: () => void; setGlobalIdx: (i: number) => void; setIsUserNavigation: (val: boolean) => void }
const StepCard = ({ step, isMobile, isTablet, globalIdx, canPrev, canNext, onPrev, onNext, setGlobalIdx, setIsUserNavigation }: StepCardProps) => {
  const [showZoom, setShowZoom] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [carouselDir, setCarouselDir] = useState(1)
  const Icon = step.icon
  const isCarousel = !!step.multiImages && Array.isArray(step.images) && step.images.length > 1
  const carouselImages: string[] = isCarousel ? step.images : []
  const activeImage: string = isCarousel ? carouselImages[carouselIdx] : step.image

  // Reset carousel index when step changes
  useEffect(() => { setCarouselIdx(0) }, [step.number])

  // Auto-advance every 2.5s
  useEffect(() => {
    if (!isCarousel) return
    const timer = setInterval(() => {
      setCarouselDir(1)
      setCarouselIdx(i => (i + 1) % carouselImages.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [isCarousel, carouselImages.length])

  const goCarousel = (dir: number) => {
    setCarouselDir(dir)
    setCarouselIdx(i => (i + dir + carouselImages.length) % carouselImages.length)
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        style={{
          width: '100%',
          borderRadius: isMobile ? '20px' : '28px',
          overflow: 'hidden',
          background: 'white',
          border: `1.5px solid ${step.iconColor}22`,
          boxShadow: `0 16px 64px ${step.iconColor}14, 0 4px 16px rgba(0,0,0,0.06)`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: '5px', background: `linear-gradient(90deg, ${step.iconColor}, ${step.iconColor}60, transparent)`, flexShrink: 0 }} />
      {/* Mobile prev/next */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '10px 14px', borderBottom: `1px solid ${step.iconColor}18`, background: 'rgba(248,250, 252,0.8)', flexShrink: 0}}>
          <motion.button onClick={onPrev} disabled={!canPrev} whileHover={canPrev ? { scale: 1.04}: {}} whileTap={canPrev ? {scale: 0.97}: {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem 0.8rem', background: canPrev ? `linear-gradient(135deg, ${BRAND.mid}, #334155)` : 'rgba(0,0,0,0.04)', color: canPrev ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px',fontSize: '12px', fontWeight: 600, cursor: canPrev ? 'pointer' : 'not-allowed', fontFamily: '"Inter",sans-serif', boxShadow: canPrev ? '0 4px 14px rgba(15,23,42,0.22)' : 'none', flexShrink: 0 }}>
            <ChevronLeft size={15} strokeWidth={2.5} />
            </motion.button> 
            <div style = {{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',overflow: 'hidden' }}>
              {ALL_STEPS.map((_: TutorialStep, i: number) => {
                const distance = Math.abs(i - globalIdx)
                if (distance > 4) return null
                const isActive = i === globalIdx
                const isNear = distance === 1
                return (
                  <motion.button key={i} onClick={() => { setIsUserNavigation(true); setGlobalIdx(i) }} animate={{ width: isActive ? 30 : isNear ? 14 : 7, height: 6, opacity: isActive ? 1 : isNear ? 0.6 : 0.28, backgroundColor: isActive ? step.iconColor : isNear ? `${step.iconColor}90` : '#cbd5e1' }} transition={{ duration: 0.25, ease: 'easeInOut' }} style={{ borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }} />
              )
              })}
             </div>
                <motion.button onClick={onNext} disabled={!canNext} whileHover={canNext ? {scale: 0.97 }: {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.5rem 0.8rem', background: canNext ? `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`: 'rgba(0,0,0,0.04)', color: canNext ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 600, cursor: canNext ? 'pointer': 'not-allowed', fontFamily: '"Inter",sans-serif', boxShadow: canNext ? `0 4px 18px ${step.iconColor}45`:'none', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                  {canNext && (<motion.div animate={{ x: ['-100%', '120%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear'}} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), transparent)', pointerEvents: 'none' }}  />)}
                  <ChevronRight size={15} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1}} />
                  </motion.button>  
            </div>
      )}
      
        {/* Main body */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          flex: 1,
          minHeight: isMobile ? 'auto' : '540px',
        }}>

          {/* LEFT: IMAGE PANEL */}
          <div style={{
            position: 'relative',
            background: `linear-gradient(145deg, ${step.iconColor}0D 0%, ${step.iconColor}05 60%, #f8fafc 100%)`,
            borderRight: isMobile ? 'none' : `1px solid ${step.iconColor}14`,
            borderBottom: isMobile ? `1px solid ${step.iconColor}14` : 'none',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '2.5rem 1.5rem 1.5rem' : '2rem 2.5rem',
            overflow: 'hidden',
            minHeight: isMobile ? '240px' : 'auto',
          }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: `radial-gradient(circle, ${step.iconColor}18, transparent 70%)`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: `radial-gradient(circle, ${step.iconColor}0E, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Step badge */}
            <div style={{
              position: 'absolute', top: '1.1rem', left: '1.1rem',
              display: 'flex', alignItems: 'center', gap: '0.45rem',
              padding: '4px 11px 4px 5px',
              background: 'rgba(255,255,255,0.88)',
              border: `1.5px solid ${step.iconColor}35`,
              borderRadius: '999px', zIndex: 2,
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '9px', fontWeight: 800, color: 'white',
                fontFamily: '"Inter", sans-serif',
                boxShadow: `0 2px 8px ${step.iconColor}40`, flexShrink: 0,
              }}>
                {step.number}
              </div>
              <span style={{ fontSize: '9.5px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Step {step.number} / {TOTAL_STEPS}
              </span>
            </div>

            {/* Zoom button */}
            <motion.button
              onClick={() => setShowZoom(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: 'absolute', top: '1.1rem', right: '1.1rem',
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 11px 5px 8px',
                background: 'rgba(255,255,255,0.88)',
                border: `1.5px solid ${step.iconColor}30`,
                borderRadius: '999px', cursor: 'pointer', zIndex: 2,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                transition: 'all 0.18s ease',
              }}
            >
              <ZoomIn size={12} color={step.iconColor} strokeWidth={2.5} />
              {!isMobile && (
                <span style={{ fontSize: '9.5px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Zoom</span>
              )}
            </motion.button>

            {/* ── IMAGE / CAROUSEL ── */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1, gap: '0.75rem' }}>

              {/* Sliding image */}
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '14px' }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isCarousel ? carouselIdx : 'single'}
                    initial={{ x: isCarousel ? carouselDir * 60 : 0, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: isCarousel ? carouselDir * -60 : 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <img
                      src={activeImage}
                      alt={step.title}
                      onLoad={() => setImgLoaded(true)}
                      style={{
                        maxWidth: '100%',
                        maxHeight: isMobile ? '240px' : isTablet ? '380px' : '460px',
                        width: 'auto', height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '14px',
                        display: 'block', margin: '0 auto',
                        border: `1.5px solid rgba(0,0,0,0.06)`,
                        boxShadow: `0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)`,
                        opacity: imgLoaded ? 1 : 0,
                        transition: 'opacity 0.35s ease',
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Zoom overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  onClick={() => setShowZoom(true)}
                  style={{
                    position: 'absolute', inset: 0,
                    borderRadius: '14px',
                    background: `linear-gradient(135deg, ${step.iconColor}28, rgba(0,0,0,0.45))`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'zoom-in',
                    backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
                  }}
                >
                  <div style={{ background: 'rgba(0,0,0,0.62)', borderRadius: '50%', padding: '14px', border: `2.5px solid ${step.iconColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 24px rgba(0,0,0,0.4)` }}>
                    <ZoomIn size={26} color={step.iconColor} strokeWidth={2} />
                  </div>
                </motion.div>

                {/* Carousel prev/next arrows */}
                {isCarousel && (
                  <>
                    <motion.button
                      onClick={() => goCarousel(-1)}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                      style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.88)', border: `1.5px solid ${step.iconColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', backdropFilter: 'blur(6px)' }}
                    >
                      <ChevronLeft size={15} color={step.iconColor} strokeWidth={2.5} />
                    </motion.button>
                    <motion.button
                      onClick={() => goCarousel(1)}
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                      style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.88)', border: `1.5px solid ${step.iconColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', backdropFilter: 'blur(6px)' }}
                    >
                      <ChevronRight size={15} color={step.iconColor} strokeWidth={2.5} />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Carousel dots */}
              {isCarousel && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {carouselImages.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => { setCarouselDir(i > carouselIdx ? 1 : -1); setCarouselIdx(i) }}
                      animate={{ width: i === carouselIdx ? 22 : 7, backgroundColor: i === carouselIdx ? step.iconColor : `${step.iconColor}45` }}
                      transition={{ duration: 0.25 }}
                      style={{ height: 6, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }}
                    />
                  ))}
                </div>
              )}

              {/* Caption */}
              <p style={{ margin: 0, color: `${step.iconColor}70`, fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', textAlign: 'center' }}>
                {isCarousel
                  ? `Image ${carouselIdx + 1} of ${carouselImages.length} · swipe or use arrows`
                  : isMobile ? 'Tap image to zoom' : 'Hover & click to zoom'}
              </p>
            </div>
          </div>

          {/* RIGHT: CONTENT PANEL */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: isMobile ? '1.1rem' : '1.4rem',
            padding: isMobile ? '2rem 1.75rem 1.75rem' : '3rem 3.25rem 2.75rem',
          }}>
            {/* Icon + title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: isMobile ? '44px' : '50px', height: isMobile ? '44px' : '50px',
                borderRadius: '13px',
                background: `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 6px 20px ${step.iconColor}40`, flexShrink: 0,
              }}>
                <Icon size={isMobile ? 20 : 24} color="white" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0, paddingTop: '3px' }}>
                <h3 style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '15px' : isTablet ? '17px' : '19px', fontWeight: 700, color: BRAND.dark, lineHeight: 1.28, margin: 0 }}>
                  {step.title}
                </h3>
                <div style={{ marginTop: '8px', height: '3px', width: '40px', background: `linear-gradient(to right, ${step.iconColor}, transparent)`, borderRadius: '2px' }} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${step.iconColor}25, transparent)`, marginTop: '-0.4rem' }} />

            {/* Description */}
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: isMobile ? '12.5px' : '13.5px',
              color: BRAND.slate, lineHeight: 1.7, margin: 0,
              padding: '1.1rem 1.3rem',
              background: `linear-gradient(135deg, ${step.iconColor}07, ${step.iconColor}03)`,
              borderRadius: '12px',
              border: `1px solid ${step.iconColor}16`,
            }}>
              {step.description}
            </p>

            {/* Key points header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ height: '2px', width: '18px', background: step.iconColor, borderRadius: '2px' }} />
              <span style={{ fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: step.iconColor, fontFamily: '"Inter", sans-serif' }}>Key points</span>
              <div style={{ height: '1.5px', flex: 1, background: `linear-gradient(to right, ${step.iconColor}30, transparent)`, borderRadius: '2px' }} />
            </div>

            {/* Detail bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {step.details.map((detail: any, i: number) => {
                const isObj = typeof detail === 'object' && detail !== null && 'message' in detail
                if (isObj) {
                  const detailObj = detail as { message: string; reason: string }
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }} style={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${step.iconColor}18` }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.5rem 0.9rem 0.45rem', background: `linear-gradient(135deg, ${step.iconColor}08, ${step.iconColor}03)`, borderLeft: `3px solid ${step.iconColor}` }}>
                        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'white', background: step.iconColor, padding: '2px 6px', borderRadius: '4px', flexShrink: 0, marginTop: '2px', lineHeight: 1.4, fontFamily: '"Inter", sans-serif' }}>Message</span>
                        <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#111827', lineHeight: 1.55, fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>{detailObj.message}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.4rem 0.9rem 0.5rem', background: 'rgba(248,250,252,0.9)', borderLeft: `3px solid ${step.iconColor}35` }}>
                        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: step.iconColor, background: `${step.iconColor}14`, border: `1px solid ${step.iconColor}35`, padding: '2px 6px', borderRadius: '4px', flexShrink: 0, marginTop: '2px', lineHeight: 1.4, fontFamily: '"Inter", sans-serif' }}>Reason</span>
                        <span style={{ fontSize: isMobile ? '10.5px' : '11.5px', color: '#4B5563', lineHeight: 1.55, fontFamily: '"Inter", sans-serif' }}>{detailObj.reason}</span>
                      </div>
                    </motion.div>
                  )
                }
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '0.6rem 0.9rem', background: i % 2 === 0 ? `linear-gradient(135deg, ${step.iconColor}08, ${step.iconColor}03)` : 'rgba(248,250,252,0.7)', borderRadius: '10px', borderLeft: `3px solid ${step.iconColor}${i % 2 === 0 ? '' : '55'}` }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, background: `${step.iconColor}18`, border: `1.5px solid ${step.iconColor}45`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                      <CheckCircle size={10} color={step.iconColor} strokeWidth={2.5} />
                    </div>
                    <span style={{ fontSize: isMobile ? '11.5px' : '12.5px', color: '#374151', lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>{detail}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Prev / Next */}
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '1.25rem', borderTop: `1px solid ${step.iconColor}18`, flexShrink: 0 }}>
                <motion.button onClick={onPrev} disabled={!canPrev} whileHover={canPrev ? { scale: 1.04 } : {}} whileTap={canPrev ? { scale: 0.97 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: isMobile ? '0.5rem 0.8rem' : '0.55rem 1rem', background: canPrev ? `linear-gradient(135deg, ${BRAND.mid}, #334155)` : 'rgba(0,0,0,0.04)', color: canPrev ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 600, cursor: canPrev ? 'pointer' : 'not-allowed', fontFamily: '"Inter", sans-serif', boxShadow: canPrev ? '0 4px 14px rgba(15,23,42,0.22)' : 'none', transition: 'all 0.2s ease', flexShrink: 0 }}>
                  <ChevronLeft size={15} strokeWidth={2.5} />
                  {!isMobile && 'Previous'}
                </motion.button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', overflow: 'hidden' }}>
                {ALL_STEPS.map((_: TutorialStep, i: number) => {
                  const distance = Math.abs(i - globalIdx)
                  if (distance > 4) return null
                  const isActive = i === globalIdx
                  const isNear = distance === 1
                  return (
                    <motion.button key={i} onClick={() => { setIsUserNavigation(true); setGlobalIdx(i) }} animate={{ width: isActive ? 30 : isNear ? 14 : 7, height: 6, opacity: isActive ? 1 : isNear ? 0.6 : 0.28, backgroundColor: isActive ? step.iconColor : isNear ? `${step.iconColor}90` : '#cbd5e1' }} transition={{ duration: 0.25, ease: 'easeInOut' }} style={{ borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0 }} />
                  )
                })}
              </div>
              <motion.button onClick={onNext} disabled={!canNext} whileHover={canNext ? { scale: 1.04 } : {}} whileTap={canNext ? { scale: 0.97 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: isMobile ? '0.5rem 0.8rem' : '0.55rem 1rem', background: canNext ? `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)` : 'rgba(0,0,0,0.04)', color: canNext ? 'white' : BRAND.muted, border: 'none', borderRadius: '9px', fontSize: '12px', fontWeight: 600, cursor: canNext ? 'pointer' : 'not-allowed', fontFamily: '"Inter", sans-serif', boxShadow: canNext ? `0 4px 18px ${step.iconColor}45` : 'none', transition: 'all 0.2s ease', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                {canNext && (<motion.div animate={{ x: ['-100%', '120%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)', pointerEvents: 'none' }} />)}
                {!isMobile && <span style={{ position: 'relative', zIndex: 1 }}>Next</span>}
                <ChevronRight size={15} strokeWidth={2.5} style={{ position: 'relative', zIndex: 1 }} />
              </motion.button>
            </div>
            )}
          </div>
        </div>
      </motion.div>

      <ZoomModal show={showZoom} onClose={() => setShowZoom(false)} step={{ ...step, image: activeImage }} isMobile={isMobile} />
    </>
  )
}

/* ─── PROGRESS BAR ─── */
interface ProgressBarProps { current: number; total: number; color: string }
const ProgressBar = ({ current, total, color }: ProgressBarProps) => (
  <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
    <motion.div animate={{ width: `${((current + 1) / total) * 100}%` }} transition={{ type: 'spring', stiffness: 200, damping: 28 }} style={{ height: '100%', background: `linear-gradient(to right, ${color}, ${color}99)`, borderRadius: '4px', boxShadow: `0 0 8px ${color}60` }} />
  </div>
)

/* ─── MAIN PAGE ─── */
export default function TutorialPage() {
  const [isMobile,    setIsMobile]    = useState(false)
  const [isTablet,    setIsTablet]    = useState(false)
  const [globalIdx,   setGlobalIdx]   = useState(0)
  const [viewMode,    setViewMode]    = useState<'step' | 'overview'>('step')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const footerRef  = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef<boolean>(true)
  const [footerOffset, setFooterOffset] = useState(0)
   const [isUserNavigation, setIsUserNavigation] = useState(false)
  const currentStep    = ALL_STEPS[globalIdx]
  const currentSection = tutorialSections.find(s => s.steps.some(st => st.number === currentStep.number))
  const canPrev = globalIdx > 0
  const canNext = globalIdx < TOTAL_STEPS - 1
  const prev = useCallback(() => {
  if (canPrev) {
    setIsUserNavigation(true)
    setGlobalIdx(i => i - 1)
  }
}, [canPrev])

const next = useCallback(() => {
  if (canNext) {
    setIsUserNavigation(true)
    setGlobalIdx(i => i + 1)
  }
}, [canNext])

const handleStepClick = (idx: number) => {
  setIsUserNavigation(true)
  setGlobalIdx(idx)

  if(viewMode === 'overview') {
    setTimeout(() => {
      const card = document.getElementById(`overview-step-${idx}`)
      card?.scrollIntoView({behavior: 'smooth', block: 'center'})
  },50)
}
}
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
}, [])

  useEffect(() => {
  const updateOffset = () => {
    const siteFooter = document.querySelector('footer') as HTMLElement | null;
    if (!siteFooter) return;
    const footerRect = siteFooter.getBoundingClientRect();
    setFooterOffset(Math.max(0, window.innerHeight - footerRect.top));
  };
  updateOffset();
  window.addEventListener('scroll', updateOffset, { passive: true });
  window.addEventListener('resize', updateOffset);
  return () => {
    window.removeEventListener('scroll', updateOffset);
    window.removeEventListener('resize', updateOffset);
  };
}, []);


  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [next, prev])


  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&family=Inter:wght@400;500;600&display=swap'
    link.rel  = 'stylesheet'
    document.head.appendChild(link)
    const style = document.createElement('style')
    style.innerHTML = `*{box-sizing:border-box}html,body{overflow-x:hidden;width:100%;margin:0;padding:0}body{overflow-y:auto}`
    document.head.appendChild(style)
    return () => { document.head.removeChild(link); document.head.removeChild(style) }
  }, [])

  useEffect(() => {
    const fn = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024) }
    fn(); window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  useEffect(() => {
    setSidebarOpen(!isMobile && !isTablet)
  }, [isMobile, isTablet])

  useEffect(() => {

  if (isFirstRender.current) {
    isFirstRender.current = false
    return
  }

  if (!isUserNavigation) return
  if (!contentRef.current) return

  const stickyNav = document.querySelector('[data-sticky-nav]') as HTMLElement | null

  const navHeight = stickyNav
    ? stickyNav.getBoundingClientRect().height
    : 72

  const elementTop =
    contentRef.current.getBoundingClientRect().top + window.pageYOffset

  window.scrollTo({
    top: elementTop - navHeight - 20,
    behavior: 'smooth'
  })

  setIsUserNavigation(false)

}, [globalIdx])

  return (
    <div style={{ minHeight: '100vh', fontFamily: '"Inter", sans-serif', background: 'linear-gradient(180deg, #ecfeff 0%, #f8fafc 30%, #ffffff 100%)', position: 'relative', width: '100%', overflowX: 'hidden' }}>

      <IndexSidebar activeGlobalIdx={globalIdx} onJump={handleStepClick} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(o => !o)} footerOffset={footerOffset} />

      <motion.div animate={{ marginLeft: (!isMobile && sidebarOpen) ? 272 : 0 }} transition={{ type: 'spring', stiffness: 340, damping: 34 }}>

        {/* ── HERO ── */}
          <section style={{ padding: isMobile ? '2rem 1rem' : isTablet ? '2.5rem 1.5rem' : '3rem 1.5rem', minHeight: isMobile ? 'auto' : '500px', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #ecfeff 100%)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <div style={{ display: isMobile ? 'flex' : 'grid', flexDirection: isMobile ? 'column' : undefined, gridTemplateColumns: isMobile ? undefined : isTablet ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem', alignItems: isMobile ? 'start' : 'center' }}>
              {/* Logo (mobile top) */}
              {isMobile && (
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }} style={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
                  <img src={logoImage} alt="GeoTrack Logo" style={{ width: '6rem', height: 'auto', objectFit: 'contain' }} />
                </motion.div>
              )}
              {isMobile && (
                <motion.div style={{ width: '100%', maxWidth: '560px', margin: '0 auto', marginTop: '2rem',paddingRight: '2rem', paddingLeft: '1rem'}} 
                animate={{ y: [0, -12, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <TutorialVideo />
                </motion.div>
              )}

              <div style={{ maxWidth: isMobile ? '100%' : '650px', marginTop: isMobile ? '0' : '-2.5rem', marginLeft: isMobile ? '0' : '0' }}>
                <motion.h1
                  initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '28px' : isTablet ? '36px' : '48px', fontWeight: 700, marginTop: '0', marginBottom: '1rem', lineHeight: isMobile ? '38px' : isTablet ? '46px' : '58px', letterSpacing: '-0.025em' }}
                >
                  {!isMobile && (
                  <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.05 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: '0.5rem' }}>
                    <img src={logoImage} alt="GeoTrack Logo" style={{ width: isTablet ? '6rem' : '8rem', height: 'auto', objectFit: 'contain' }} />
                  </motion.div>
                )}
                  <span style={{ color: 'rgb(6, 182, 212)', fontWeight: 900 }}>Explore Geotrack</span>{' '}
                  <span style={{ color: '#0F172A' }}>with Detailed Step-by-Step Tutorials</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '14px' : '16px', fontWeight: 400, color: '#475569', marginTop: '-0.75rem', marginBottom: '1.5rem', lineHeight: isMobile ? '22px' : '26px' }}>
                  Learn how to discover nearby clients, plan meetings, and track field visits with comprehensive tutorials covering client mapping and visit tracking.
                </motion.p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {['Quick start guides for instant setup', 'Advanced feature walkthroughs', 'How it works steps for smooth onboarding'].map((feature, idx) => (
                    <motion.div key={feature} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: isMobile ? '1.75rem' : '2.25rem', height: isMobile ? '1.75rem' : '2.25rem', borderRadius: '0.5rem', background: 'rgba(6, 182, 212, 0.15)', border: '2px solid rgb(6, 182, 212)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle style={{ width: isMobile ? '1rem' : '1.25rem', height: isMobile ? '1rem' : '1.25rem', color: 'rgb(6, 182, 212)' }} />
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? '14px' : '16px', fontWeight: 500, color: '#475569', lineHeight: isMobile ? '22px' : '26px' }}>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '4rem' }} animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                  <TutorialVideo />
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION HEADER ── */}
        <section style={{ padding: isMobile ? '2.5rem 1rem 1.5rem' : '3rem 1.5rem 2rem', background: 'linear-gradient(to bottom, rgba(255,255,255,0), #f8fafc)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', padding: isMobile ? '0 0.5rem' : '0 1.5rem' }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '28px' : isTablet ? '34px' : '40px', fontWeight: 700, color: 'rgb(20,47,83)', marginBottom: '0.75rem', lineHeight: isMobile ? '36px' : isTablet ? '42px' : '48px' }}>
              Complete Step-by-Step Guide
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '15px' : '17px', color: BRAND.slate, margin: '0 auto', lineHeight: isMobile ? '23px' : '26px', fontWeight: 400 }}>
              Master GeoTrack with our comprehensive guide covering every feature from sign-up to advanced functionality
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: isMobile ? '0.65rem 1rem' : '0.75rem 1.25rem', margin: '1.25rem auto 0', maxWidth: 'fit-content', background: `linear-gradient(135deg, ${BRAND.primary}10, rgba(59,130,246,0.10))`, border: `1.5px solid ${BRAND.primary}30`, borderRadius: '999px', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', boxShadow: `0 4px 12px ${BRAND.primary}12, inset 0 1px 0 rgba(255,255,255,0.6)` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '2rem' : '2.25rem', height: isMobile ? '2rem' : '2.25rem', borderRadius: '8px', background: `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)`, border: `1.5px solid ${BRAND.primary}40`, flexShrink: 0 }}>
                <ArrowLeft size={isMobile ? 14 : 16} color={BRAND.primaryDk} strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '0.875rem' : isTablet ? '0.9375rem' : '1rem', color: BRAND.primaryDk, fontWeight: 600, letterSpacing: '-0.01em' }}>
                {isMobile ? 'Use buttons to navigate steps' : 'Use arrow keys to navigate between steps'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '2rem' : '2.25rem', height: isMobile ? '2rem' : '2.25rem', borderRadius: '8px', background: `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)`, border: `1.5px solid ${BRAND.primary}40`, flexShrink: 0 }}>
                <ArrowRight size={isMobile ? 14 : 16} color={BRAND.primaryDk} strokeWidth={2.5} />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── STICKY NAV ── */}
        <div data-sticky-nav style={{ position: 'sticky', top: 0, zIndex: 200, background: 'rgba(248,250,252,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0.75rem 1rem' : '0.85rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
              <motion.button onClick={() => setSidebarOpen(o => !o)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '5px 12px 5px 7px', background: sidebarOpen ? `linear-gradient(135deg, ${BRAND.primary}18, rgba(56,189,248,0.12))` : 'linear-gradient(135deg, rgba(15,23,42,0.06), rgba(15,23,42,0.03))', border: `1.5px solid ${sidebarOpen ? BRAND.primary + '45' : 'rgba(0,0,0,0.1)'}`, borderRadius: '999px', backdropFilter: 'blur(10px)', cursor: 'pointer', flexShrink: 0, transition: 'all 0.22s ease' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', flexShrink: 0, background: sidebarOpen ? `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)` : 'linear-gradient(135deg, rgba(15,23,42,0.1), rgba(15,23,42,0.06))', border: `1.5px solid ${sidebarOpen ? BRAND.primary + '40' : 'rgba(0,0,0,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1px' }}>
  {sidebarOpen ? (
    <>
      <ChevronLeft size={11} color={BRAND.primaryDk} strokeWidth={2.5} />
      <div style={{ width: '1.5px', height: '10px', borderRadius: '2px', background: BRAND.primaryDk }} />
    </>
  ) : (
    <>
      <div style={{ width: '1.5px', height: '10px', borderRadius: '2px', background: BRAND.slate }} />
      <ChevronRight size={11} color={BRAND.slate} strokeWidth={2.5} />
    </>
  )}
</div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: sidebarOpen ? BRAND.primaryDk : BRAND.slate, fontFamily: '"Inter", sans-serif', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>{sidebarOpen ? 'Hide index' : 'Tutorial Index'}</span>
              </motion.button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: currentStep?.iconColor, boxShadow: `0 0 8px ${currentStep?.iconColor}60` }} />
              {!isMobile && (<span style={{ fontSize: '12px', fontWeight: 600, color: BRAND.slate, whiteSpace: 'nowrap', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentSection?.sectionTitle}</span>)}
            </div>
            <div style={{ flex: 1 }}>
              <ProgressBar current={globalIdx} total={TOTAL_STEPS} color={currentStep?.iconColor || BRAND.primary} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: BRAND.slate, whiteSpace: 'nowrap', flexShrink: 0, fontFamily: '"Inter", sans-serif' }}>{globalIdx + 1} / {TOTAL_STEPS}</span>
            {!isMobile && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {[{ id: 'step', Icon: List, label: 'Step view' }, { id: 'overview', Icon: Grid3X3, label: 'Overview' }].map(({ id, Icon: Ic, label }) => {
                  const active = viewMode === id
                  return (
                    <motion.button key={id} onClick={() => setViewMode(id as 'step' | 'overview')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '5px 11px 5px 7px', background: active ? `linear-gradient(135deg, ${BRAND.primary}18, rgba(56,189,248,0.12))` : 'linear-gradient(135deg, rgba(15,23,42,0.05), rgba(15,23,42,0.02))', border: `1.5px solid ${active ? BRAND.primary + '45' : 'rgba(0,0,0,0.09)'}`, borderRadius: '999px', backdropFilter: 'blur(10px)', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0, background: active ? `linear-gradient(135deg, ${BRAND.primary}30, ${BRAND.primary}18)` : 'linear-gradient(135deg, rgba(15,23,42,0.09), rgba(15,23,42,0.05))', border: `1.5px solid ${active ? BRAND.primary + '40' : 'rgba(0,0,0,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Ic size={12} color={active ? BRAND.primaryDk : BRAND.slate} strokeWidth={2} />
                      </div>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: active ? BRAND.primaryDk : BRAND.slate, fontFamily: '"Inter", sans-serif', letterSpacing: '-0.01em', transition: 'color 0.2s ease' }}>{label}</span>
                    </motion.button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── STEP VIEW ── */}
        {viewMode === 'step' && (
          <section style={{ padding: isMobile ? '1.5rem 1rem 2.5rem' : isTablet ? '2.5rem 2rem 3.5rem' : '3rem 3.5rem 4.5rem', minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '1rem' : '1.5rem', background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)' }}>
            <div ref={contentRef} style={{ scrollMarginTop: '90px', width: '100%', maxWidth: '1100px', display: 'flex', justifyContent: 'center' }}>
              <AnimatePresence mode="wait">
                <motion.div key={`section-${currentSection?.sectionId}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3 }} style={{ textAlign: 'center', width: '100%', maxWidth: '700px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '4px 14px', borderRadius: '999px', marginBottom: '0.6rem', background: `${currentStep?.iconColor}14`, border: `1.5px solid ${currentStep?.iconColor}35` }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: currentStep?.iconColor, boxShadow: `0 0 6px ${currentStep?.iconColor}80` }} />
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: currentStep?.iconColor, fontFamily: '"Inter", sans-serif' }}>
                      {currentSection?.sectionTitle}
                    </span>
                  </div>
                  <p style={{ fontSize: isMobile ? '13px' : '14px', color: BRAND.muted, margin: 0, lineHeight: 1.65, fontFamily: '"Inter", sans-serif' }}>
                    {currentSection?.sectionDescription}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div style={{ width: '100%', maxWidth: '1160px' }}>
              <AnimatePresence mode="wait">
                <StepCard key={globalIdx} step={currentStep} isMobile={isMobile} isTablet={isTablet} globalIdx={globalIdx} canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} setGlobalIdx={handleStepClick} setIsUserNavigation={setIsUserNavigation}/>
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* ── OVERVIEW GRID ── */}
        {viewMode === 'overview' && (
          <section style={{ padding: isMobile ? '1.5rem 1rem 3rem' : '2.5rem 3rem 4rem', maxWidth: '1280px', margin: '0 auto', background: 'linear-gradient(180deg, #f0f9ff 0%, #f8fafc 40%, #ffffff 100%)' }}>
            {tutorialSections.map((section, secIdx) => {
              const sectionColor = (section as any).sectionColor || BRAND.primary
              return (
                <motion.div key={section.sectionId} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4, ease: 'easeOut' }} style={{ marginBottom: isMobile ? '3.5rem' : '5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '2px solid rgba(0,0,0,0.07)' }}>
                    <div style={{ width: '5px', height: '44px', borderRadius: '4px', flexShrink: 0, background: `linear-gradient(180deg, ${sectionColor}, ${sectionColor}55)`, boxShadow: `0 2px 8px ${sectionColor}40` }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '16px' : '18px', fontWeight: 700, color: BRAND.dark, margin: 0, lineHeight: 1.2 }}>{section.sectionTitle}</h3>
                        <span style={{ fontSize: '11px', color: BRAND.muted, fontFamily: '"Inter", sans-serif', flexShrink: 0, background: 'rgba(0,0,0,0.04)', padding: '2px 9px', borderRadius: '999px', border: '1px solid rgba(0,0,0,0.08)' }}>{section.steps.length} {section.steps.length === 1 ? 'step' : 'steps'}</span>
                      </div>
                      {!isMobile && (<p style={{ fontSize: '12.5px', color: BRAND.muted, margin: '5px 0 0', fontFamily: '"Inter", sans-serif', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '580px', whiteSpace: 'nowrap' }}>{section.sectionDescription}</p>)}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '7px', flexShrink: 0 }}>
                      <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: BRAND.slate, background: 'rgba(0,0,0,0.05)', border: '1.5px solid rgba(0,0,0,0.09)', padding: '4px 11px', borderRadius: '999px', fontFamily: '"Inter", sans-serif' }}>Section {secIdx + 1}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', color: BRAND.muted, fontFamily: '"Inter", sans-serif' }}>{section.steps.filter((st:any) => ALL_STEPS.findIndex(s => s.number === st.number) < globalIdx).length}/{section.steps.length} done</span>
                        <div style={{ width: '80px', height: '5px', background: 'rgba(0,0,0,0.07)', borderRadius: '5px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', borderRadius: '5px', background: `linear-gradient(to right, ${sectionColor}, ${sectionColor}aa)`, width: `${(section.steps.filter((st:any) => ALL_STEPS.findIndex(s => s.number === st.number) < globalIdx).length / section.steps.length) * 100}%`, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '1.25rem' : '1.5rem' }}>
                    {section.steps.map((step, stepLocalIdx) => {
                      const stepGlobalIdx = ALL_STEPS.findIndex(s => s.number === step.number)
                      const Icon = step.icon
                      const isPast = stepGlobalIdx < globalIdx
                      const isCurrent = stepGlobalIdx === globalIdx
                      return (
                        <motion.button key={step.number} id={`overview-step-${stepGlobalIdx}`} onClick={() => { handleStepClick(stepGlobalIdx); setViewMode('step') }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: stepLocalIdx * 0.04, ease: 'easeOut' }} whileHover={{ y: -6, boxShadow: `0 20px 48px ${step.iconColor}28, 0 4px 12px rgba(0,0,0,0.08)`, transition: { duration: 0.18 } }} whileTap={{ scale: 0.985, transition: { duration: 0.1 } }}
                          style={{ display: 'flex', flexDirection: 'column', borderRadius: '20px', textAlign: 'left', background: isPast ? `linear-gradient(160deg, ${step.iconColor}06, #f8fafc)` : 'white', borderTop: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`, borderRight: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`, borderBottom: isCurrent ? `2px solid ${step.iconColor}` : isPast ? `1.5px solid ${step.iconColor}22` : `1.5px solid rgba(0,0,0,0.09)`, borderLeft: `6px solid ${step.iconColor}`, cursor: 'pointer', boxShadow: isCurrent ? `0 8px 32px ${step.iconColor}25, 0 0 0 4px ${step.iconColor}10` : '0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.09)', transition: 'border-color 0.2s ease, box-shadow 0.2s ease', minHeight: isMobile ? 'auto' : '240px' }}
                        >
                          <div style={{ padding: isMobile ? '1.5rem 1.5rem 1.5rem 1.25rem' : '1.75rem 1.75rem 1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isPast ? '#10B981' : isCurrent ? step.iconColor : `${step.iconColor}15`, border: isPast || isCurrent ? 'none' : `2px solid ${step.iconColor}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isCurrent ? `0 3px 10px ${step.iconColor}50` : 'none', transition: 'all 0.2s ease', flexShrink: 0 }}>
                                {isPast ? <CheckCircle size={15} color="white" strokeWidth={2.5} /> : <span style={{ fontSize: '11px', fontWeight: 800, color: isCurrent ? 'white' : step.iconColor, fontFamily: '"Inter", sans-serif' }}>{step.number}</span>}
                              </div>
                              {isCurrent && (<div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '999px', background: `${step.iconColor}12`, border: `1.5px solid ${step.iconColor}40` }}><div style={{ width: '7px', height: '7px', borderRadius: '50%', background: step.iconColor, boxShadow: `0 0 5px ${step.iconColor}90` }} /><span style={{ fontSize: '10px', fontWeight: 700, color: step.iconColor, fontFamily: '"Inter", sans-serif' }}>Current</span></div>)}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                              <div style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0, boxShadow: isPast ? 'none' : `0 4px 14px ${step.iconColor}35`, background: isPast ? `${step.iconColor}15` : `linear-gradient(135deg, ${step.iconColor}, ${step.iconColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s ease' }}>
                                <Icon size={19} color={isPast ? step.iconColor : 'white'} strokeWidth={2.5} />
                              </div>
                              <span style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 700, color: isPast ? BRAND.slate : BRAND.dark, fontFamily: '"Poppins", sans-serif', lineHeight: 1.3, paddingTop: '3px' }}>{step.title}</span>
                            </div>
                            <p style={{ fontSize: isMobile ? '12px' : '13px', color: BRAND.slate, lineHeight: 1.65, fontFamily: '"Inter", sans-serif', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{step.description}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.65rem', borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: 'auto' }}>
                              <span style={{ fontSize: '11.5px', color: BRAND.muted, fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>{step.details.length} key {step.details.length === 1 ? 'point' : 'points'}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: step.iconColor }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: '"Inter", sans-serif' }}>{isPast ? 'Review' : 'Open'}</span>
                                <ArrowRight size={12} strokeWidth={2.5} />
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </section>
        )}
  

      </motion.div>
      
        {/* ── CTA ── */}
        <div style={{ padding: isMobile ? '2rem 1.25rem 2rem' : '2rem 1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 40%, #eef2ff 100%)', borderTop: '1px solid rgba(99,179,237,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-80px', right: '-40px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(99,179,237,0.35)', borderRadius: '999px', fontSize: '12px', fontWeight: 600, color: '#0369a1', marginBottom: '0.75rem', letterSpacing: '0.03em', boxShadow: '0 2px 8px rgba(99,179,237,0.15)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 2px rgba(34,197,94,0.3)' }} />
            All systems ready
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: '"Poppins", sans-serif', fontSize: isMobile ? '24px' : '34px', fontWeight: 700, color: BRAND.dark, marginBottom: '0.65rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Ready to get started?</motion.h2>
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ fontSize: '15px', color: BRAND.slate, maxWidth: '380px', margin: '0 auto 1.25rem', lineHeight: 1.65 }}>You've covered the essentials. Head to the Dashboard to put GeoTrack to work.</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <motion.button onClick={() => window.location.href = 'https://geo-track-em3s.onrender.com/dashboard'} whileHover={{ scale: 1.04, y: -2, boxShadow: '0 16px 40px rgba(15,23,42,0.35)' }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: isMobile ? '1rem 2rem' : '1.05rem 2.4rem', background: `linear-gradient(135deg, ${BRAND.dark} 0%, #1e3a5f 50%, ${BRAND.mid} 100%)`, color: 'white', borderRadius: '14px', border: 'none', fontSize: isMobile ? '15px' : '16px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 28px rgba(15,23,42,0.28), 0 0 0 1px rgba(255,255,255,0.08) inset', fontFamily: '"Inter", sans-serif', position: 'relative', overflow: 'hidden', letterSpacing: '-0.01em' }}>
              <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)', pointerEvents: 'none' }} />
              <span style={{ position: 'relative', zIndex: 1 }}>Go to Dashboard</span>
              <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'relative', zIndex: 1, display: 'flex' }}>
                <ArrowRight size={18} strokeWidth={2.5} />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

      {/* ── FLOATING SCROLL BUTTONS ── */}
      {!isMobile && (
        <div style={{ position: 'fixed', right: '1.5rem', bottom: '2rem', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 400 }}>
          <motion.button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.93 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} title="Back to top" style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryDk})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px ${BRAND.primary}55, 0 2px 6px rgba(0,0,0,0.12)` }}>
            <ArrowUp size={20} color="white" strokeWidth={2.5} />
          </motion.button>
          <motion.button onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} whileHover={{ scale: 1.12, y: 2 }} whileTap={{ scale: 0.93 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} title="Go to bottom" style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, #0e7490, ${BRAND.primaryDk})`, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 20px rgba(8,145,178,0.5), 0 2px 6px rgba(0,0,0,0.12)` }}>
            <ArrowDown size={20} color="white" strokeWidth={2.5} />
          </motion.button>
        </div>
      )}

      {/* <div ref={footerRef}>
        <Footer/>
      </div> */}
    </div>
  )
}