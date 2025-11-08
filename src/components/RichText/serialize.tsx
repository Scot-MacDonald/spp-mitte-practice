import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import React, { Fragment, JSX } from 'react'
import { CMSLink } from '@/components/Link'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { BannerBlock as BannerBlockProps } from '@/payload-types'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import type { Page } from '@/payload-types'

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | Extract<Page['layout'][0], { blockType: 'cta' }>
      | Extract<Page['layout'][0], { blockType: 'mediaBlock' }>
      | BannerBlockProps
      | CodeBlockProps
    >

type Props = {
  nodes: NodeTypes[]
}

// Type guard to check if a node has children
function hasChildren(node: NodeTypes): node is NodeTypes & { children: NodeTypes[] } {
  return 'children' in node && Array.isArray(node.children)
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (!node) return null

        // Text node
        if (node.type === 'text') {
          let text: JSX.Element = <>{node.text}</>

          if (node.format & IS_BOLD) text = <strong>{text}</strong>
          if (node.format & IS_ITALIC) text = <em>{text}</em>
          if (node.format & IS_STRIKETHROUGH)
            text = <span style={{ textDecoration: 'line-through' }}>{text}</span>
          if (node.format & IS_UNDERLINE)
            text = <span style={{ textDecoration: 'underline' }}>{text}</span>
          if (node.format & IS_CODE) text = <code>{node.text}</code>
          if (node.format & IS_SUBSCRIPT) text = <sub>{text}</sub>
          if (node.format & IS_SUPERSCRIPT) text = <sup>{text}</sup>

          return <React.Fragment key={index}>{text}</React.Fragment>
        }

        // Serialize children safely
        const serializedChildren = hasChildren(node)
          ? serializeLexical({ nodes: node.children })
          : null

        // Block nodes
        if (node.type === 'block') {
          const block = node.fields
          if (!block?.blockType) return null

          switch (block.blockType) {
            case 'cta':
              return <CallToActionBlock key={index} {...block} />
            case 'mediaBlock':
              return (
                <MediaBlock
                  key={index}
                  className="col-start-1 col-span-3"
                  imgClassName="m-0"
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                  disableInnerContainer={true}
                  {...block}
                />
              )
            case 'banner':
              return <BannerBlock key={index} className="col-start-2 mb-4" {...block} />
            case 'code':
              return <CodeBlock key={index} className="col-start-2" {...block} />
            default:
              return null
          }
        }

        // Inline/other nodes
        switch (node.type) {
          case 'linebreak':
            return <br key={index} className="col-start-2" />
          case 'paragraph':
            return (
              <p key={index} className="col-start-2">
                {serializedChildren}
              </p>
            )
          case 'heading':
            const HeadingTag = node.tag || 'h2'
            return (
              <HeadingTag key={index} className="col-start-2">
                {serializedChildren}
              </HeadingTag>
            )
          case 'list':
            const ListTag = node.tag || 'ul'
            return (
              <ListTag key={index} className="list col-start-2">
                {serializedChildren}
              </ListTag>
            )
          case 'listitem':
            if (node.checked != null) {
              return (
                <li
                  key={index}
                  role="checkbox"
                  tabIndex={-1}
                  aria-checked={node.checked ? 'true' : 'false'}
                  value={node.value}
                >
                  {serializedChildren}
                </li>
              )
            }
            return (
              <li key={index} value={node.value}>
                {serializedChildren}
              </li>
            )
          case 'quote':
            return (
              <blockquote key={index} className="col-start-2">
                {serializedChildren}
              </blockquote>
            )
          case 'link':
            const fields = node.fields
            return (
              <CMSLink
                key={index}
                newTab={Boolean(fields?.newTab)}
                reference={fields?.doc as any}
                type={fields?.linkType === 'internal' ? 'reference' : 'custom'}
                url={fields?.url}
              >
                {serializedChildren}
              </CMSLink>
            )
          default:
            return null
        }
      })}
    </Fragment>
  )
}
