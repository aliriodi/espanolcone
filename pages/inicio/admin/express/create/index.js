import { useState } from "react";
import AdminPage from "../../../../../components/GenericsElements/Admin/AdminPage";
import BodyGeneric from "../../../../../components/GenericsElements/BodyGeneric";
import ActivityTemplate from "../../../../../components/GenericsElements/Activity/ActivityTemplate";
import ActivityTemplateEdit from "../../../../../components/GenericsElements/Activity/ActivityTemplateEdit";

export default function CreateExpress() {
    const [currentSheets, setCurrentSheets] = useState([
        {
          template: "mini-1",
          data: [
            {
              type: "title",
              value: "Titulo por Defecto",
              className: "subtitle-default",
            //   style:{
            //     "background-color": "#f00"
            //   }
            },
            {
              type: "separator",
              className: "separator"
            },
            {
              type: "paragraph",
              value: "Las microlecciones son módulos o piezas de aprendizaje de consumo rápido que se enfocan en un determinado contenido. Las microlecciones no se desarrollan “porque el estudiante no tiene capacidad de atención” o porque “se quiere ahorrar tiempo durante la sesión”",
              className: "paragraph-default"
            },
            {
              type: "separator",
              className: "separator-transparent"
            },
            {
              type: "selectsimple",
              value: "1.Las microlecciones son...",
              option: "3. Todas las anteriores",
              options: [
                "1. Módulos o piezas de aprendizaje",
                "2. Son de consumo rápido",
                "3. Todas las anteriores",
                "4. Ninguna de las anteriores"
              ],
              className: "selector-simple"
            },
            {
              type: "selectsimple",
              value: "2. ¿Por qué se desarrollan las microlecciones?",
              option: "1. Para ahorrar tiempo en la sesion de clases",
              options: [
                "1. Para ahorrar tiempo en la sesion de clases",
                "2. Para que el estudiante no practique",
                "3. Para no motivar al estudiante a profundizar su conocimiento"
              ],
              className: "selector-simple"
            }
          ]
        }
    ])

    function handleChangeSheet(sheet){
        console.log(sheet)
        setCurrentSheets([sheet])
    }

    return (
        <BodyGeneric>

            <AdminPage>

                <ActivityTemplateEdit
                sheetsOfSection={currentSheets[0]}
                handleChangeSheet={handleChangeSheet} 
                />
                
            </AdminPage>

        </BodyGeneric>
    )
}
