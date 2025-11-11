import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TextBildBlock } from '@/blocks/TextBildBlock/Component' // ✅ NEW IMPORT
import { CMSLink } from '@/components/Link'
import React, { Fragment, JSX } from 'react'

import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'

import type {
  BannerBlock as BannerBlockProps,
  TextBildBlock as TextBildBlockProps, // ✅ NEW TYPE IMPORT
  Page,
} from '@/payload-types'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | Extract<Page['layout'][0], { blockType: 'cta' }>
      | Extract<Page['layout'][0], { blockType: 'mediaBlock' }>
      | Extract<Page['layout'][0], { blockType: 'textBildBlock' }> // ✅ NEW BLOCK ADDED
      | BannerBlockProps
      | CodeBlockProps
      | TextBildBlockProps
    >

type Props = {
  nodes: NodeTypes[]
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) return null

        // -----------------------------
        // 🧩 TEXT NODES
        // -----------------------------
        if (node.type === 'text') {
          let textNode: JSX.Element | string = node.text

          // ✅ Apply color style first (object or string)
          if (typeof node.style === 'object' && node.style !== null && 'color' in node.style) {
            const color = (node.style as { color?: string })?.color
            if (color) {
              textNode = <span style={{ color }}>{textNode}</span>
            }
          } else if (typeof node.style === 'string') {
            const colorMatch = node.style.match(/color:\s*(#[0-9A-Fa-f]{6}|[a-zA-Z]+)/)
            const color = colorMatch?.[1]
            if (color) {
              textNode = <span style={{ color }}>{textNode}</span>
            }
          }

          // ✅ Apply formatting
          if (node.format & IS_BOLD) textNode = <strong>{textNode}</strong>
          if (node.format & IS_ITALIC) textNode = <em>{textNode}</em>
          if (node.format & IS_STRIKETHROUGH)
            textNode = <span style={{ textDecoration: 'line-through' }}>{textNode}</span>
          if (node.format & IS_UNDERLINE)
            textNode = <span style={{ textDecoration: 'underline' }}>{textNode}</span>
          if (node.format & IS_CODE) textNode = <code>{node.text}</code>
          if (node.format & IS_SUBSCRIPT) textNode = <sub>{textNode}</sub>
          if (node.format & IS_SUPERSCRIPT) textNode = <sup>{textNode}</sup>

          return <Fragment key={index}>{textNode}</Fragment>
        }

        // -----------------------------
        // 🧩 SERIALIZE CHILDREN (safe for all node types)
        // -----------------------------
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          // ✅ Safe type check to avoid "Property 'children' does not exist" errors
          if (!('children' in node) || !node.children) return null

          // Fix for checklists missing `checked: false`
          if (node?.type === 'list' && node?.listType === 'check') {
            for (const item of node.children) {
              if ('checked' in item && item.checked == null) item.checked = false
            }
          }

          return serializeLexical({ nodes: node.children as NodeTypes[] })
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        // -----------------------------
        // 🧩 CUSTOM BLOCK NODES
        // -----------------------------
        if (node.type === 'block') {
          const block = node.fields
          const blockType = block?.blockType
          if (!block || !blockType) return null

          switch (blockType) {
            case 'cta':
              return <CallToActionBlock key={index} {...block} />
            case 'mediaBlock':
              return (
                <MediaBlock
                  key={index}
                  {...block}
                  className="col-start-1 col-span-3"
                  imgClassName="m-0"
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                  disableInnerContainer
                />
              )
            case 'banner':
              return <BannerBlock key={index} {...block} className="col-start-2 mb-4" />
            case 'code':
              return <CodeBlock key={index} {...block} className="col-start-2" />
            case 'textBildBlock': // ✅ HANDLE YOUR NEW BLOCK
              return <TextBildBlock key={index} {...block} className="col-start-2" />
            default:
              return null
          }
        }

        // -----------------------------
        // 🧩 STANDARD NODES
        // -----------------------------
        switch (node.type) {
          case 'linebreak':
            return <br key={index} className="col-start-2" />
          case 'paragraph':
            return (
              <p key={index} className="col-start-2">
                {serializedChildren}
              </p>
            )
          case 'heading': {
            const Tag = node?.tag
            return (
              <Tag key={index} className="col-start-2">
                {serializedChildren}
              </Tag>
            )
          }
          case 'list': {
            const Tag = node?.tag
            return (
              <Tag key={index} className="list col-start-2">
                {serializedChildren}
              </Tag>
            )
          }
          case 'listitem':
            if (node?.checked != null) {
              return (
                <li
                  key={index}
                  role="checkbox"
                  aria-checked={node.checked ? 'true' : 'false'}
                  tabIndex={-1}
                  value={node?.value}
                >
                  {serializedChildren}
                </li>
              )
            } else {
              return (
                <li key={index} value={node?.value}>
                  {serializedChildren}
                </li>
              )
            }
          case 'quote':
            return (
              <blockquote key={index} className="col-start-2">
                {serializedChildren}
              </blockquote>
            )
          case 'link': {
            const fields = node.fields
            return (
              <CMSLink
                key={index}
                type={fields.linkType === 'internal' ? 'reference' : 'custom'}
                url={fields.url}
                newTab={Boolean(fields?.newTab)}
                reference={fields.doc as any}
              >
                {serializedChildren}
              </CMSLink>
            )
          }
          default:
            return null
        }
      })}
    </Fragment>
  )
}
