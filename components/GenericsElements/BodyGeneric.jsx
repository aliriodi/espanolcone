import Menu from "../Menu"

export default function BodyGeneric({children}) {
  return (
    <>
        <Menu/>

        <section className="relative px-[60px] overflow-hidden py-[119px]
        md:ml-0 md:px-[25px]">
            {children}
        </section>
    </>
  )
}
