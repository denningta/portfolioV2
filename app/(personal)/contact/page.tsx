
import { notFound } from 'next/navigation'

export default async function EmploymentSlugRoute({
  params,
}: {
  params: { slug: string }
}) {

  return (
    <>
      <div>
        contact page
      </div>
    </>
  )
}
