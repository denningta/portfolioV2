'use client'

import { SkillPayload } from "types"
import Tooltip from "./Tooltip"
import InlineSvg from "./InlineSvg"
import { useRouter } from "next/navigation"

interface SkillProps {
  skill: SkillPayload
}

export default function Skill({ skill }: SkillProps) {
  const router = useRouter()

  const handleSkillClick = (event: React.MouseEvent, slug: string | undefined) => {
    event.preventDefault()
    if (!slug) return
    router.push(`/skills/${slug}`)
  }

  return (
    <Tooltip title={skill.title}>
      <div
        className='flex flex-row items-center justify-center cursor-pointer text-sx md:text-sm  rounded-full hover:ring ring-blue-500/20  bg-white dark:bg-neutral-700 drop-shadow-sm border dark:border-neutral-800'
        style={{
          height: 40,
          width: 40
        }}
        onClick={(e) => handleSkillClick(e, skill.slug?.current)}
      >
        {skill.icon?.svg &&
          <div
            className=''
            style={{
              color: skill.color?.hex ?? '#000000',
            }}
          >
            <InlineSvg src={skill.icon.svg} fontSize={20} />
          </div>
        }
      </div>
    </Tooltip>
  )

}

