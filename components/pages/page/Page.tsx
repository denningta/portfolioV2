import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ScrollUp from 'components/shared/ScrollUp'
import type { PagePayload } from 'types'
import { ProjectListItem } from '../home/ProjectListItem'
import { SkillListItem } from '../home/SkillListItem'
import { EmploymentListItem } from '../home/EmploymentListItem'
import Pdf from 'components/shared/Pdf'

export function Page({ data }: { data: PagePayload }) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, overview, title, listFormat, referenceList, pdf } = data || {}



  return (
    <div>
      <div className="mb-14 space-y-10">
        {/* Header */}
        <Header title={title} description={overview} centered />

        {/* Body */}
        {body && (
          <CustomPortableText
            paragraphClasses="font-serif max-w-3xl text-gray-600 dark:text-gray-100 text-xl transition ease-in-out"
            value={body}
          />
        )}

        {/* Reference List*/}
        {referenceList &&
          <div className={` ${listFormat === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' : 'flex flex-col space-y-10'}`}>
            {referenceList.map((reference, key) => {
              if (reference._type === 'project')
                return <ProjectListItem key={key} project={reference} />

              if (reference._type === 'skill')
                return <SkillListItem key={key} skill={reference} />

              if (reference._type === 'employment')
                return <EmploymentListItem key={key} employment={reference} />
            }
            )}
          </div>
        }

        {pdf?.asset &&
          <Pdf pdf={pdf} />
        }

        {/* Workaround: scroll to top on route change */}
        <ScrollUp />
      </div>
      <div className="absolute left-0 w-screen border-t dark:border-t-neutral-800 transition ease-in-out" />
    </div>
  )
}
