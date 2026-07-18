import { ImageResponse } from 'next/og'
import { getBlogPost } from './page'

export const runtime = 'edge'

export const alt = 'Blog Post - Mutuku Joshua'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  const title = post?.title || 'Blog Post'

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: '#c8a820',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          Mutuku Joshua
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 400,
            color: '#faf7f2',
            textAlign: 'center',
            lineHeight: 1.2,
            fontFamily: 'serif',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            fontSize: 20,
            color: 'rgba(240, 232, 212, 0.5)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          lumyn.co.ke
        </div>
      </div>
    ),
    { ...size }
  )
}
