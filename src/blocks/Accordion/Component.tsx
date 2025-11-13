'use client'

import * as Accordion from '@radix-ui/react-accordion'
import React from 'react'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type AccordionBlockProps = {
  title?: string
  subheading?: string
  richText?: any

  items?: {
    title: string
    content: any
    enableLink?: boolean
    link?: any
  }[]
}

type Props = {
  className?: string
} & AccordionBlockProps

export const AccordionBlock: React.FC<Props> = ({
  className,
  title,
  subheading,
  richText,

  items,
}) => {
  return (
    <section className={cn(' ', className)}>
      <div className="page-with-header mb-[20px] sm:mb-[50px] ">
        <h2 className="page-header px-4 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <svg
            className="hidden lg:block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#7eb36a" strokeWidth="2">
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="12" x2="12" y1="3" y2="21" className="AccordionVerticalLine" />
            </g>
          </svg>
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-12 items-start">
        {/* Accordion column */}
        <div className="col-span-12 lg:col-span-6 p-4 lg:p-8">
          <div className="w-full max-w-full">
            <Accordion.Root type="multiple">
              {items?.map((item, index) => (
                <Accordion.Item
                  key={index}
                  value={`item-${index}`}
                  className={cn(
                    'border-b',
                    'data-[state=open]:bg-[#f0f8ec]',
                    'transition-colors duration-300',
                  )}
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        'AccordionTrigger px-4 py-10 flex justify-between items-center w-full text-left cursor-pointer',
                        'hover:bg-[rgba(126,179,106,0.1)]',
                        'data-[state=open]:bg-[#f0f8ec]',
                        'transition-colors duration-300',
                      )}
                    >
                      <h2 className="text-xl  font-medium">{item.title}</h2>
                      <span className="AccordionChevron">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <g fill="none" stroke="#7eb36a" strokeWidth="2">
                            <line x1="3" x2="21" y1="12" y2="12" />
                            <line
                              x1="12"
                              x2="12"
                              y1="3"
                              y2="21"
                              className="AccordionVerticalLine"
                            />
                          </g>
                        </svg>
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content
                    className={cn(
                      'AccordionContent overflow-hidden transition-all duration-500 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-4',
                    )}
                  >
                    <div className="py-4">
                      <RichText
                        content={item.content}
                        enableGutter={false}
                        enableProse={false}
                        className="text-gray-600"
                      />
                      {item.enableLink && item.link && (
                        <div className="mt-4">
                          <CMSLink
                            {...item.link}
                            className="inline-block  px-4 py-2 rounded text-[#7eb36a] bg-[rgba(126,179,106,0.3)] hover:bg-[#7eb36a] hover:text-white transition-colors duration-200"
                          />
                        </div>
                      )}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>

        {/* First RichText column */}
        <div className="col-span-12 lg:col-span-6 mt-[15px] p-4 lg:p-8 ">
          {subheading && <h3 className="">{subheading}</h3>}
          {richText && <RichText content={richText} enableGutter={false} className="mb-4" />}
        </div>
      </div>
    </section>
  )
}
