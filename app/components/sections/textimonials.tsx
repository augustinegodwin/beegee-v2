import React from 'react'
import MaxWidthContainer from '../utils/maxWidthContainer'
import SectionHeader from '../utils/sectionHeader'
import FeedbackCard from '../utils/feedbackCard'
const testimonials = [
  {
    message: "A total game changer for campus trade. Buying and selling is now stress-free and super easy!",
    user: "Chinedu Okeke",
    status: "Buyer & Seller"
  },
  {
    message: "Renting out my textbooks was so smooth. Found reliable students to rent them almost immediately.",
    user: "Oluwatobi Adeyemi",
    status: "Renter"
  },
  {
    message: "Lifesaver study materials! The process is fast and the deals are student-friendly.",
    user: "Blessing Ifeanyi",
    status: "Buyer"
  },
  {
    message: "Selling my old gadgets was a breeze. Got serious offers the same day I listed my phone.",
    user: "Abubakar Musa",
    status: "Seller"
  },
  {
    message: "I rented out my bike with zero worries. The system is secure and the community is respectful.",
    user: "Amina Yusuf",
    status: "Lender"
  },
  {
    message: "The campus marketplace. I’ve secured great deals on electronics without any stress.",
    user: "Emeka Nwosu",
    status: "Buyer & Seller"
  },
  {
    message: "Found a furniture renter in no time. Simple interface and a very helpful support team.",
    user: "Zainab Bello",
    status: "Renter"
  },
  {
    message: "The best platform for students. Buying or renting, the experience is consistently 10/10.",
    user: "Tunde Bakare",
    status: "Buyer & Seller"
  }
]
export default function Testimonials() {
  return (
    <MaxWidthContainer>
        <div className="py-25 w-full flex flex-col justify-center gap-25">
            <SectionHeader
                title="Amazing Feedback from Beegee User's "
                body='Explore what buyers, sellers and people who rent on our platform are saying about beegee'
                buttonValue='Join the testimony'
                buttonAction='https://chat.whatsapp.com/DJ3TM9S64eW0ui5I9Zgzh6?mode=gi_t'
            />
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {testimonials.map((testimonial, index) => (
                <FeedbackCard
                    key={index}
                    message={testimonial.message}
                    user={testimonial.user}
                    status={testimonial.status}
                />
            ))}
            </div>
        </div>
    </MaxWidthContainer>
  )
}
