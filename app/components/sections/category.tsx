import React from 'react'
import MaxWidthContainer from '../utils/maxWidthContainer'
import SectionHeader from '../utils/sectionHeader'
import CategoryCard from '../utils/categoryCard'
import airpods from '../../assets/images/airpods.webp'
import table from '../../assets/images/Away_The Large_ Aluminium Edition.webp'
import table2 from '../../assets/images/Oakywood_Standing Desk Pro.webp'
import okay from '../../assets/images/studio display.webp'
export default function Category() {
  return (
    <MaxWidthContainer>
        <div className="py-25 flex flex-col justify-center gap-25">
            <SectionHeader
                title='Explore Amazing Collections on Beegee'
                body='Select a category to find textbooks, electronics, fashion, and more from your fellow students'
                buttonAction='/store'
                buttonValue='View all Categories'
            />
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
                <CategoryCard
                    image={airpods}
                    title='Electronics'
                    linkTo='/store?category=books'
                />
                <CategoryCard
                    image={okay}
                    title='Entertainment'
                    linkTo='/store?category=books'
                />
                <CategoryCard
                    image={table}
                    title='Study Essentials'
                    linkTo='/store?category=books'
                />
                <CategoryCard
                    image={table2}
                    title='Others'
                    linkTo='/store?category=books'
                />
            </div>
        </div>
    </MaxWidthContainer>
  )
}
