import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TextBildBlock } from '@/blocks/TextBildBlock/Component'
import { NewsAndHoursBlock } from '@/blocks/NewsAndHours/Component'
import { DoctorBlock } from '@/blocks/DoctorBlock/Component'
import { AccordionBlock } from '@/blocks/Accordion/Component'
import MitgliedBlock from '@/blocks/Mitglied/Component'
import KontaktAnfahrtBlock from '@/blocks/KontaktAnfahrt/Component'
import { SliderBlock } from '@/blocks/SliderBlock/Component'

import { TypedLocale } from 'payload'

const blockComponents = {
  accordion: AccordionBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  mitglied: MitgliedBlock,
  textBildBlock: TextBildBlock,
  newsAndHours: NewsAndHoursBlock,
  kontaktAnfahrt: KontaktAnfahrtBlock,
  doctor: DoctorBlock,
  contentSlider: SliderBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: TypedLocale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-6 lg:my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} locale={locale} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
