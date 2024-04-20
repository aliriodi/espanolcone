import Menu from "../Menu"

export default function BodyGeneric({children, redirectPath}) {
  return (
    <>
        <Menu redirectPath={redirectPath}/>

        <section className="relative px-[60px] overflow-hidden py-[119px] min-h-screen
        md:ml-0 md:px-[25px]">
            {children}
        </section>
    </>
  )
}
