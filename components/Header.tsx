import Button from "@components/Button"
import Signout from "@components/Signout"

type Props = {
  titleText?: string
  isProfileList?: boolean
  profileCount?: number
  canSignout?: boolean
  hasProfiles?: boolean
  canGoBack?: boolean
}

const PageHeader = ({
  titleText,
  isProfileList,
  profileCount,
  canSignout,
  hasProfiles,
  canGoBack,
}: Props) => {
  if (isProfileList) {
    return (
      <header className="mt-16 flex h-14 flex-row items-start justify-around">
        <div>
          <h1>Profiles List</h1>
          <h2>There are {profileCount} profiles</h2>
        </div>
        <div className="flex gap-4">
          <Button color="grey" canGoBack />
          <Button color="purple" link={`/profiles/create-profile`}>
            Create Profile
          </Button>
        </div>
      </header>
    )
  }

  return (
    <div className="flex w-screen max-w-4xl items-end justify-between rounded-lg bg-white p-6 shadow-lg">
      <h1>{titleText}</h1>
      <div className="flex gap-4">
        {canSignout && <Signout />}
        {hasProfiles && (
          <Button link="/profiles" color="purple">
            Profiles List
          </Button>
        )}
        {canGoBack && <Button color="grey" canGoBack />}
      </div>
    </div>
  )
}

export default PageHeader
