
import ContactPage from 'components/pages/contact/ContactPage'

export default async function EmploymentSlugRoute({
  params,
}: {
  params: { slug: string }
}) {


  return (
    <>
      <div>
        <ContactPage />
      </div>
    </>
  )
}
