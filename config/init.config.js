const db = require("../models/");
const empleadoModel = require("../models/empleado.model");
const roleModelb = require("../models/role.model");
const userModel = require("../models/usuario.model");
const permisoModel = require("../models/permiso.model");
const PEIModel = require("../models/PEI.model");
const areasModel = require("../models/areas.model");
const bcrypt = require("bcryptjs");
const config = require("./auth.config.js");
const { DB } = require("./db.config");
const { roles_permiso } = require("../models/");
const Role = db.role;
const User = db.user;
const Empleado = db.empleado;
const Permiso = db.permiso;
const PEI = db.pei;
const Areas = db.areas;
const permiso_role = db.roles_permiso;
const Objetivos = db.objetivos;
const Dimension = db.dimension;
const Resultados = db.resultado;
//const Sesion = db.sesion;


exports.initial = async () => {
    try {


        await Role.create({
            id: 1,
            rol: "admin",
            descripcion: "super usuario",
        });

        await PEI.create({
            name: "Mantenimiento general",
            initialYear: '2020-08-07',
            finalYear: '2020-09-08',
        });

        await db.institucion.create({
            nombre:'CURLP',
            descripcion:'Centro regional'
        })
        

        await db.pei.create({
            name:'UNAH1',
            initialYear:'2020-01-01',
            finalYear:'2022-01-01',
            isActive:1,
        })
        
        await db.dimension.bulkCreate([{
                nombre:'01-DESARROLLO E INNOVACION CURRICULAR',
                descripcion:'01-DESARROLLO E INNOVACION CURRICULAR',
                idPei:1
            },
            {
                nombre:'02-INVESTIGACION CIENTIFICA',
                descripcion:'02-INVESTIGACION CIENTIFICA',
                idPei:1
            },
            {
                nombre:'03-VINCULACION UNIVERSIDAD SOCIEDAD',
                descripcion:'03-VINCULACION UNIVERSIDAD SOCIEDAD',
                idPei:1
            },
            {
                nombre:'04-DOCENCIA Y PROFESORADO UNIVERSITARIO',
                descripcion:'04-DOCENCIA Y PROFESORADO UNIVERSITARIO',
                idPei:1
            },
            {
                nombre:'05-ESTUDIANTES',
                descripcion:'05-ESTUDIANTES',
                idPei:1
            },
            {
                nombre:'06-GRADUADOS',
                descripcion:'06-GRADUADOS',
                idPei:1
            },
            {
                nombre:'07-GESTION DEL CONOCIMIENTO',
                descripcion:'07-GESTION DEL CONOCIMIENTO',
                idPei:1
            },
            {
                nombre:'08-LO ESENCIAL',
                descripcion:'08-LO ESENCIAL',
                idPei:1
            },
            {
                nombre:'09-CULTURA DE INNOVACION INSTITUCIONAL Y EDUCATIVA',
                descripcion:'09-CULTURA DE INNOVACION INSTITUCIONAL Y EDUCATIVA',
                idPei:1
            },{
                nombre:'10-ASEGURAMIENTO DE LA CALIDAD',
                descripcion:'10-ASEGURAMIENTO DE LA CALIDAD',
                idPei:1
            },{
                nombre:'11-POSGRADO',
                descripcion:'11-POSGRADO',
                idPei:1
            },{
                nombre:'12-GESTION ADMINISTRATIVA',
                descripcion:'12-GESTION ADMINISTRATIVA',
                idPei:1
            },{
                nombre:'13-GESTION DEL TALENTO HUMANO',
                descripcion:'13-GESTION DEL TALENTO HUMANO',
                idPei:1
            },{
                nombre:'14-GESTION ACADEMICA',
                descripcion:'14-GESTION ACADEMICA',
                idPei:1
            },{
                nombre:'15-INTERNACIONALIZACION DE LA EDUCACION SUPERIOR',
                descripcion:'15-INTERNACIONALIZACION DE LA EDUCACION SUPERIOR',
                idPei:1
            },{
                nombre:'16-GOBERNABILIDAD Y PROCESO DE GESTIÓN DESCENTRALIZADAS EN REDES',
                descripcion:'16-GOBERNABILIDAD Y PROCESO DE GESTIÓN DESCENTRALIZADAS EN REDES',
                idPei:1
            },{
                nombre:'17-DESARROLLO DEL SISTEMA DE EDUCACIÓN SUPERIOR',
                descripcion:'17-DESARROLLO DEL SISTEMA DE EDUCACIÓN SUPERIOR',
                idPei:1
            },{
                nombre:'18-GESTION TIC',
                descripcion:'18-GESTION TIC',
                idPei:1
            }]);
        

        await db.objetivos.bulkCreate([{
            nombre:"1. Impulsar un proceso de desarrollo curricular siguiendo los lineamientos del Modelo Educativo de la UNAH en consonancia con las nuevas tendencias y diversidad educativa (formal, no formal y continua); se diseñaran currículos innovadores (abiertos, flexibles e incluyentes) acordes a estándares internacionales y que contaran con referentes axiológicos que orienten la selección de contenidos y la coherencia entre estos.",
            descripcion:"1. Impulsar un proceso de desarrollo curricular siguiendo los lineamientos del Modelo Educativo de la UNAH en consonancia con las nuevas tendencias y diversidad educativa (formal, no formal y continua); se diseñaran currículos innovadores (abiertos, flexibles e incluyentes) acordes a estándares internacionales y que contaran con referentes axiológicos que orienten la selección de contenidos y la coherencia entre estos.",
            idDimension: 1,
            idPei:1
        },{
            nombre:"2) Consolidar la aplicación de la política de bimodalidad en la UNAH.",
            descripcion:"2) Consolidar la aplicación de la política de bimodalidad en la UNAH.",
            idDimension: 1,
            idPei:1
        },{
            nombre:"Consolidar el sistema de investigación científica y tecnológica de la UNAH, para posicionarse en una situación de liderazgo nacional y regional, tanto del conocimiento como de sus aplicaciones, desarrollando una investigación de impacto nacional y con reconocimiento internacional, ampliamente integrada a la docencia, especialmente al postgrado y vinculada a la solución de problemas, promoviendo sustantivamente el desarrollo del país.",
            descripcion:"Consolidar el sistema de investigación científica y tecnológica de la UNAH, para posicionarse en una situación de liderazgo nacional y regional, tanto del conocimiento como de sus aplicaciones, desarrollando una investigación de impacto nacional y con reconocimiento internacional, ampliamente integrada a la docencia, especialmente al postgrado y vinculada a la solución de problemas, promoviendo sustantivamente el desarrollo del país.",
            idDimension: 2,
            idPei:1
        },{
            nombre:"Fortalecer de manera permanente y sostenida la Vinculación de la UNAH con el Estado, sus graduados, las fuerzas sociales, productivas y demás que integran la sociedad hondureña.",
            descripcion:"Fortalecer de manera permanente y sostenida la Vinculación de la UNAH con el Estado, sus graduados, las fuerzas sociales, productivas y demás que integran la sociedad hondureña.",
            idDimension: 3,
            idPei:1
        },{
            nombre:"Crear en la comunidad universitaria una cultura de compromiso social, a través de la construcción de redes y ámbitos de inserción con la sociedad hondureña, para construir vías de comunicación y de acción efectivas entre distintas comunidades y la Universidad, para construir participativamente valores, conocimientos y espacios de mutuo aprendizaje.",
            descripcion:"Crear en la comunidad universitaria una cultura de compromiso social, a través de la construcción de redes y ámbitos de inserción con la sociedad hondureña, para construir vías de comunicación y de acción efectivas entre distintas comunidades y la Universidad, para construir participativamente valores, conocimientos y espacios de mutuo aprendizaje.",
            idDimension: 3,
            idPei:1
        },{
            nombre:"Focalizar la inserción de los graduados universitarios en los mercados de trabajo, su seguimiento y actualización educativa, con estudios de postgrado, que sean pertinentes a los programas acádemicas y de actualización continua.",
            descripcion:"Focalizar la inserción de los graduados universitarios en los mercados de trabajo, su seguimiento y actualización educativa, con estudios de postgrado, que sean pertinentes a los programas acádemicas y de actualización continua.",
            idDimension: 3,
            idPei:1
        },{
            nombre:"Empoderar y formar de manera permanente al profesorado universitario en prácticas académicas innovadoras, alineadas con los objetivos académicos, estratégicos y del Modelo Educativo de la Universidad, con el propósito que construyan las múltiples competencias para su transformación académica y la de los estudiantes (actualización, innovación, culturización) con valores y ética, en el plano docente, humanístico y disciplinar.",
            descripcion:"Empoderar y formar de manera permanente al profesorado universitario en prácticas académicas innovadoras, alineadas con los objetivos académicos, estratégicos y del Modelo Educativo de la Universidad, con el propósito que construyan las múltiples competencias para su transformación académica y la de los estudiantes (actualización, innovación, culturización) con valores y ética, en el plano docente, humanístico y disciplinar.",
            idDimension: 4,
            idPei:1
        },{
            nombre:"Propiciar cambios en la calidad de vida y formación académica de los estudiantes universitarios; articulando procesos de orientación, asesoría, salud, cultura, deporte, estímulos académicos y atención diferenciada e inclusiva, con el fin de lograr el desarrollo estudiantil para el logro de su excelencia académica y profesional.",
            descripcion:"Propiciar cambios en la calidad de vida y formación académica de los estudiantes universitarios; articulando procesos de orientación, asesoría, salud, cultura, deporte, estímulos académicos y atención diferenciada e inclusiva, con el fin de lograr el desarrollo estudiantil para el logro de su excelencia académica y profesional.",
            idDimension: 5,
            idPei:1
        },{
            nombre:"Focalizar la inserción de los graduados universitarios en los mercados de trabajo, con miras al cambio, haciendo enfasis en el emprendedurismo, su seguimiento y actualización educativa profesional, con estudios de postgrado que sean pertinentes a las necesidades que enfrenta el país, al desarrollo de la ciencia y la tecnología y, a la actualización continua de los graduados.",
            descripcion:"Focalizar la inserción de los graduados universitarios en los mercados de trabajo, con miras al cambio, haciendo enfasis en el emprendedurismo, su seguimiento y actualización educativa profesional, con estudios de postgrado que sean pertinentes a las necesidades que enfrenta el país, al desarrollo de la ciencia y la tecnología y, a la actualización continua de los graduados.",
            idDimension: 6,
            idPei:1
        },{
            nombre:"Velar y promover de manera efectiva, la inclusión de los Graduados Universitarios calificados para el relevo docente ( entre otros, reorientado y fortaleciendo a través de un nuevo Reglamento, a los Instructores).",
            descripcion:"Velar y promover de manera efectiva, la inclusión de los Graduados Universitarios calificados para el relevo docente ( entre otros, reorientado y fortaleciendo a través de un nuevo Reglamento, a los Instructores).",
            idDimension: 6,
            idPei:1
        },{
            nombre:"Gestionar y promover el conocimiento científico y social para contribuir a la superación de los principales problemas del país, para satisfacer las necesidades prioritarias y desplegar las potencialidades para el desarrollo humano sostenible a nivel local, nacional y regional a través de la movilidad y el intercambio, el uso de las TICs y funcionamiento de redes, entre otros.",
            descripcion:"Gestionar y promover el conocimiento científico y social para contribuir a la superación de los principales problemas del país, para satisfacer las necesidades prioritarias y desplegar las potencialidades para el desarrollo humano sostenible a nivel local, nacional y regional a través de la movilidad y el intercambio, el uso de las TICs y funcionamiento de redes, entre otros.",
            idDimension: 7,
            idPei:1
        },{
            nombre:"1) Transversalizar en los planes de estudios, curriculares y didácticos, y en todas las funciones académicas y actividades administrativas de la UNAH, la PRÁCTICA DE LA ÉTICA, la identidad y la cultura para la construcción de ciudadanía: ÉTICA",
            descripcion:"1) Transversalizar en los planes de estudios, curriculares y didácticos, y en todas las funciones académicas y actividades administrativas de la UNAH, la PRÁCTICA DE LA ÉTICA, la identidad y la cultura para la construcción de ciudadanía: ÉTICA",
            idDimension: 8,
            idPei:1
        },{
            nombre:"2) Garantizar una educación integral, que incorpore la gestión académica del conocimiento, de cultura para el desarrollo, como parte de la dinámica institucional, y del perfil profesional, orientado al fortalecimiento de la ciudadano.",
            descripcion:"2) Garantizar una educación integral, que incorpore la gestión académica del conocimiento, de cultura para el desarrollo, como parte de la dinámica institucional, y del perfil profesional, orientado al fortalecimiento de la ciudadano.",
            idDimension: 8,
            idPei:1
        },{
            nombre:"3) Priorizar la producción y gestión del conocimiento con alto contenido de identidad nacional, regional y local; que refuerce el saber local-regional, aborde los problemas nacionales, y que transite hacia la internacionalización del conocimiento.",
            descripcion:"3) Priorizar la producción y gestión del conocimiento con alto contenido de identidad nacional, regional y local; que refuerce el saber local-regional, aborde los problemas nacionales, y que transite hacia la internacionalización del conocimiento.",
            idDimension: 8,
            idPei:1
        },{
            nombre:"4) Fortalecer en la comunidad universitaria la práctica de la cultura física y deportes, el aprecio por las artes y la cultura como parte de la formación integral y del buen vivir.",
            descripcion:"4) Fortalecer en la comunidad universitaria la práctica de la cultura física y deportes, el aprecio por las artes y la cultura como parte de la formación integral y del buen vivir.",
            idDimension: 8,
            idPei:1
        },{
            nombre:"1. Fortalecer la cultura de la Innovación Institucional y Educativa e implementar el modelo de innovación educativa de la UNAH, que integre el currículo, las metodologías, las estrategias de enseñanza y aprendizaje, los materiales y recursos didácticos, el uso educativo de las TIC, la relación con el entorno, la profesionalización docente, y la profesionalización de la dirección y conducción de la UNAH.",
            descripcion:"1. Fortalecer la cultura de la Innovación Institucional y Educativa e implementar el modelo de innovación educativa de la UNAH, que integre el currículo, las metodologías, las estrategias de enseñanza y aprendizaje, los materiales y recursos didácticos, el uso educativo de las TIC, la relación con el entorno, la profesionalización docente, y la profesionalización de la dirección y conducción de la UNAH.",
            idDimension: 9,
            idPei:1
        },{
            nombre:"Mejora continua y acreditación de la calidad de la UNAH, sus servicios y funciones sustantivas de docencia, investigación y vinculación universidad-sociedad. y programas; evidenciada en la rendición de cuentas a la sociedad hondureña y en la atención oportuna efectiva y pertinente a las demandas auténticas de ésta.",
            descripcion:"Mejora continua y acreditación de la calidad de la UNAH, sus servicios y funciones sustantivas de docencia, investigación y vinculación universidad-sociedad. y programas; evidenciada en la rendición de cuentas a la sociedad hondureña y en la atención oportuna efectiva y pertinente a las demandas auténticas de ésta.",
            idDimension: 10,
            idPei:1
        },{
            nombre:"Promover un sistema de aseguramiento de la calidad en la UNAH, con participación de todas las Unidades Académicas, Administrativas, Financieras y Logísticas.",
            descripcion:"Promover un sistema de aseguramiento de la calidad en la UNAH, con participación de todas las Unidades Académicas, Administrativas, Financieras y Logísticas.",
            idDimension: 10,
            idPei:1
        },{
            nombre:"Convertir a la Universidad en una Institución respetuosa del medio ambiente, saludable y segura para todos que cree conciencia y promueva estilos de vida saludables dentro de la sociedad, con el propósito de fortalecer la participación ciudadana, la critica constructiva y la creatividad.",
            descripcion:"Convertir a la Universidad en una Institución respetuosa del medio ambiente, saludable y segura para todos que cree conciencia y promueva estilos de vida saludables dentro de la sociedad, con el propósito de fortalecer la participación ciudadana, la critica constructiva y la creatividad.",
            idDimension: 10,
            idPei:1
        },{
            nombre:"Posicionar a la UNAH como una institución líder en la formación de posgrados a nivel nacional, generando una oferta de posgrados de estricta pertinencia con las necesidades de conocimiento que los distintos sectores de la sociedad hondureña requieren, lo que unido a la calidad de los programas y a su capacidad de actualización, están en consonancia con los desafíos de crecimiento y desarrollo del país y la región.",
            descripcion:"Posicionar a la UNAH como una institución líder en la formación de posgrados a nivel nacional, generando una oferta de posgrados de estricta pertinencia con las necesidades de conocimiento que los distintos sectores de la sociedad hondureña requieren, lo que unido a la calidad de los programas y a su capacidad de actualización, están en consonancia con los desafíos de crecimiento y desarrollo del país y la región.",
            idDimension: 11,
            idPei:1
        },{
            nombre:"Lograr un desarrollo institucional acorde con los ingresos económicos, de modo que se asegure su viabilidad futura, focalizado en el mejoramiento de la situación económico-financiera de la UNAH y su desarrollo a través de la generación de ingresos y del aumento a la productividad. Para ello se busca mejorar la eficiencia de los recursos e insumos, el crecimiento y mantenimiento de la infraestructura de acuerdo a las necesidades de la calidad y las perspectivas de expansión en un ambiente de calidad, acogedor, diverso y pluralista con una infraestructura de calidad, estéticamente atractiva e inserta en un entorno natural y cultural privilegiado que favorezca el trabajo académico y la convivencia social.",
            descripcion:"Lograr un desarrollo institucional acorde con los ingresos económicos, de modo que se asegure su viabilidad futura, focalizado en el mejoramiento de la situación económico-financiera de la UNAH y su desarrollo a través de la generación de ingresos y del aumento a la productividad. Para ello se busca mejorar la eficiencia de los recursos e insumos, el crecimiento y mantenimiento de la infraestructura de acuerdo a las necesidades de la calidad y las perspectivas de expansión en un ambiente de calidad, acogedor, diverso y pluralista con una infraestructura de calidad, estéticamente atractiva e inserta en un entorno natural y cultural privilegiado que favorezca el trabajo académico y la convivencia social.",
            idDimension: 12,
            idPei:1
        },{
            nombre:"Innovar, crear y mejorar la gestión administrativa-financiera, en función de la actividad académica y de los diferentes insumos y recursos institucionales, y aquellos que se generen por las diferentes unidades, aplicando procesos administrativos y principios de eficiencia, eficacia, oportunidad, transparencia y rendición de cuentas en todos los actos de la UNAH.",
            descripcion:"Innovar, crear y mejorar la gestión administrativa-financiera, en función de la actividad académica y de los diferentes insumos y recursos institucionales, y aquellos que se generen por las diferentes unidades, aplicando procesos administrativos y principios de eficiencia, eficacia, oportunidad, transparencia y rendición de cuentas en todos los actos de la UNAH.",
            idDimension: 12,
            idPei:1
        },{
            nombre:"Promover de manera planificada el permanente desarrollo del talento humano docente y administrativo de la UNAH en todo el ciclo vital, productivo y laboral: captación, selección, inducción, desempeño, despliegue de capacidades y potencialidades, capacitación, formación, distribución, egreso. y vínculo social e institucional; asegurando el relevo en nuevos campos del conocimiento científico, técnico y humanístico.",
            descripcion:"Promover de manera planificada el permanente desarrollo del talento humano docente y administrativo de la UNAH en todo el ciclo vital, productivo y laboral: captación, selección, inducción, desempeño, despliegue de capacidades y potencialidades, capacitación, formación, distribución, egreso. y vínculo social e institucional; asegurando el relevo en nuevos campos del conocimiento científico, técnico y humanístico.",
            idDimension: 13,
            idPei:1
        },{
            nombre:"Contar con una gestión académica de calidad y pertinente a la complejidad de la UNAH, ágil, moderna y flexible que permita un apoyo efectivo al desarrollo de las funciones fundamentales de la Universidad y del proceso educativo; por medio de la formulación y aplicación a través de un sistema automatizado de políticas, normas y procedimientos académicos ; que orienta la planificación, organización, integración y control de los servicios de soporte a la docencia, investigación, vinculación universidad-sociedad, gestión del conocimiento, y la monitoria y evaluación de dichas funciones, con un enfoque de gestión basada en resultados y evaluación de alcances.",
            descripcion:"Contar con una gestión académica de calidad y pertinente a la complejidad de la UNAH, ágil, moderna y flexible que permita un apoyo efectivo al desarrollo de las funciones fundamentales de la Universidad y del proceso educativo; por medio de la formulación y aplicación a través de un sistema automatizado de políticas, normas y procedimientos académicos ; que orienta la planificación, organización, integración y control de los servicios de soporte a la docencia, investigación, vinculación universidad-sociedad, gestión del conocimiento, y la monitoria y evaluación de dichas funciones, con un enfoque de gestión basada en resultados y evaluación de alcances.",
            idDimension: 14,
            idPei:1
        },{
            nombre:"Liderar y coordinar los esfuerzos institucionales de internacionalización de la educación superior, a fin de contribuir de manera eficaz al fortalecimiento y mejoramiento académico de la UNAH en el marco de la Reforma Universitaria.",
            descripcion:"Liderar y coordinar los esfuerzos institucionales de internacionalización de la educación superior, a fin de contribuir de manera eficaz al fortalecimiento y mejoramiento académico de la UNAH en el marco de la Reforma Universitaria.",
            idDimension: 15,
            idPei:1
        },{
            nombre:"Fortalecer y consolidar el gobierno universitario, basando sus acciones y decisiones en los principios de Democracia, Respeto, Responsabilidad, Subsidiaridad, Transparencia y Rendición de cuentas.",
            descripcion:"Fortalecer y consolidar el gobierno universitario, basando sus acciones y decisiones en los principios de Democracia, Respeto, Responsabilidad, Subsidiaridad, Transparencia y Rendición de cuentas.",
            idDimension: 16,
            idPei:1
        },{
            nombre:"Fortalecer y consolidar las responsabilidades de la UNAH en el papel de organizar, dirigir y desarrollar la educación superior del país.",
            descripcion:"Fortalecer y consolidar las responsabilidades de la UNAH en el papel de organizar, dirigir y desarrollar la educación superior del país.",
            idDimension: 16,
            idPei:1
        },{
            nombre:"Avanzar de manera planificada y progresiva en un proceso de descentralización de la gestión académica y administrativa financiera hacia las redes educativas regionales",
            descripcion:"Avanzar de manera planificada y progresiva en un proceso de descentralización de la gestión académica y administrativa financiera hacia las redes educativas regionales",
            idDimension: 16,
            idPei:1
        },{
            nombre:"Fortalecer y consolidar las responsabilidades de la UNAH en el papel de organizar, dirigir y desarrollar la educación superior del país.",
            descripcion:"Fortalecer y consolidar las responsabilidades de la UNAH en el papel de organizar, dirigir y desarrollar la educación superior del país.",
            idDimension: 17,
            idPei:1
        },{
            nombre:"2. Integrar activamente a la UNAH al campo de la Bimodalidad (Educación presencial y a Distancia en todas sus expresiones) incorporando la tecnología de forma permanente.",
            descripcion:"2. Integrar activamente a la UNAH al campo de la Bimodalidad (Educación presencial y a Distancia en todas sus expresiones) incorporando la tecnología de forma permanente.",
            idDimension: 18,
            idPei:1
        },{
            nombre:"1. Consolidar y asumir el liderazgo nacional en las Tecnologías de la Información y Comunicación para la academia, la ciencia y la cultura.",
            descripcion:"1. Consolidar y asumir el liderazgo nacional en las Tecnologías de la Información y Comunicación para la academia, la ciencia y la cultura.",
            idDimension: 18,
            idPei:1
        },{
            nombre:"3. Mantener y fortalecer a la UNAH con una infraestructura de redes, telecomunicaciones, equipo ofimático y aplicaciones informáticas (hardware y software), como plataforma para todo el quehacer universitario.",
            descripcion:"3. Mantener y fortalecer a la UNAH con una infraestructura de redes, telecomunicaciones, equipo ofimático y aplicaciones informáticas (hardware y software), como plataforma para todo el quehacer universitario.",
            idDimension: 18,
            idPei:1
        },{
            nombre:"4. Consolidar el Gobierno Electrónico institucional a través de la sistematización, automatización de los procesos académicos y administrativos a través de las TIC en forma ágil y eficiente.",
            descripcion:"4. Consolidar el Gobierno Electrónico institucional a través de la sistematización, automatización de los procesos académicos y administrativos a través de las TIC en forma ágil y eficiente.",
            idDimension: 18,
            idPei:1
        }]);         
        

        await db.areas.bulkCreate([{
            nombre:"Mejoramiento de la Calidad Educativa.",
            idObjetivos: 1,
            idDimension: 1,
            idPei: 1
        },{
            nombre:"Mejoramiento de la Calidad Educativa.",
            idObjetivos: 2,
            idDimension: 1,
            idPei: 1
        },{
            nombre:"a) Las facultades y los centros regionales se insertan en el eje de fomento de la investigación; desarrollan investigación en el marco de las prioridades de investigación.",
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre:"d) Las facultades y los centros regionales se insertan en el eje de capacitación en investigación; aprovechan la oferta de capacitación y actualización en investigación científica.",
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre:"e) Las facultades y los centros regionales se insertan en el eje de gestión de la investigación; cuentan con al menos instancias de gestión y/o ejecución de la investigación que promueven y gestionan recursos internos/ externos y desarrollan proyectos de investigación que contribuyen a la solución de problemas y a la generación de conocimiento pertinente.",
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre:"b) Las Facultades y los Centros Regionales se insertan en el eje de publicación, difusión y comunicación; promueven y publican las investigaciones realizadas por su personal docente y estudiantil.",
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre:"c) Las facultades y los centros regionales se insertan en el eje de protección de los resultados de investigación; utilizan los resultados de las investigaciones para contribuir a la solución de los problemas prioritarios del país y al desarrollo científico y técnico.",
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre:"A. Vínculos académicos y alianzas estratégicas",
            idObjetivos: 4,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"C. Gestión académica y administrativa de la vinculación",
            idObjetivos: 4,
            idDimension: 3,
            idPei: 1
        },{ 
            nombre:"C. Gestión académica y administrativa de la vinculación",
            idObjetivos: 4,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"B. Socialización y creación de conocimiento en vinculación",
            idObjetivos: 4,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"B. Educacion No Formal",
            idObjetivos: 5,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"C. Comunicación y Difusión",
            idObjetivos: 5,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"D. Desarrollo Local y Cultura",
            idObjetivos: 5,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"A. Servicio Social y gestión del riesgo",
            idObjetivos: 5,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"A. Inserción laboral",
            idObjetivos: 6,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"B. Actualización profesional y formación continua",
            idObjetivos: 6,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"C. Estudios de seguimiento de graduados",
            idObjetivos: 6,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"F. Servicios y Beneficios",
            idObjetivos: 6,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"G. Eventos y Encuentros",
            idObjetivos: 6,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"D. Asociación de Graduados",
            idObjetivos: 6,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"E. Plataforma Virtual",
            idObjetivos: 6,
            idDimension: 3,
            idPei: 1
        },{
            nombre:"Fortalecemiento de las competencias docentes para la educación superior que faciliten el aprendizaje y mejoren la eficiencia terminal.",
            idObjetivos: 7,
            idDimension: 4,
            idPei: 1
        },{
            nombre:"a. Brindar atención a los estudiantes universitarios de forma integral en su dimensión psico-pedagógica y social, que involucre aspectos interpersonales-afectivos, mediación de conflictos, orientación, asesoría, rendimiento académico, inducción vocacional y laboral.",
            idObjetivos: 8,
            idDimension: 5,
            idPei: 1
        },{
            nombre:"b. Contribuir a la promoción, prevención y atención integral de la salud en el estudiantado universitario, para mejorar su calidad de vida y rendimiento académico.",
            idObjetivos: 8,
            idDimension: 5,
            idPei: 1
        },{
            nombre:"c. Promover la realización de actividades socioculturales y deportivas tanto recreativas, competitivas y de intercambio estudiantil universitario.",
            idObjetivos: 8,
            idDimension: 5,
            idPei: 1
        },{
            nombre:"d. Contribuir al mejoramiento de la calidad de vida estudiantil mediante la promoción de espacios y beneficios que le permitan el desarrollo de sus potencialidades bajo perspectivas de equidad e inclusión, además de promover una cultura de solidaridad, cooperación y participación ciudadana a través de la formación de líderes y voluntarios universitarios.",
            idObjetivos: 8,
            idDimension: 5,
            idPei: 1
        },{
            nombre:"Mejoramiento de la Calidad, la Pertinencia y la equidad.",
            idObjetivos: 9,
            idDimension: 6,
            idPei: 1
        },{
            nombre:"Fortalecimiento de la Calidad.",
            idObjetivos: 10,
            idDimension: 6,
            idPei: 1
        },{
            nombre:"a) Fortalecimiento y consolidación del proceso de organización y desarrollo de las redes educativas regionales de la UNAH, y de los planes estratégicos y tácticos para continuar con la reforma integral de los centros regionales de la UNAH.",
            idObjetivos: 11,
            idDimension: 7,
            idPei: 1
        },{
            nombre:"b) Mejorar significativamente la cobertura de la UNAH y el acceso de la población hondureña a los servicios académicos de la UNAH.",
            idObjetivos: 11,
            idDimension: 7,
            idPei: 1
        },{
            nombre:"c) Desarrollar los Centros Regionales de la UNAH, como polos de desarrollo científico, técnico, y cultural de las regiones del país.",
            idObjetivos: 11,
            idDimension: 7,
            idPei: 1
        },{
            nombre:"1. ÉTICA: Transversalización del Eje Curricular de Ética en las actividades administrativas y como eje integrador de los demás ejes del Modelo Educativo de la UNAH.",
            idObjetivos: 12,
            idDimension: 8,
            idPei: 1
        },{
            nombre:"2. CIUDADANÍA: Expansión del perfil profesional con elementos de ciudadanía educativa.",
            idObjetivos: 13,
            idDimension: 8,
            idPei: 1
        },{
            nombre:"3. IDENTIDAD: Producción del conocimiento con identidad, nacional, regional, local, y para la internacionalización académica de la UNAH.",
            idObjetivos: 14,
            idDimension: 8,
            idPei: 1
        },{
            nombre:"4. CULTURA: Formación de ciudadanos de cultura, globales, de región, y productivos, potenciando el rol de los CRU.",
            idObjetivos: 15,
            idDimension: 8,
            idPei: 1
        },{
            nombre:"Aplicación del modelo de innovación educativa que integre como ámbitos de innovación educativa: el currículo, las metodologías, las estrategias de enseñanza y aprendizaje, los materiales y recursos didácticos, el uso educativo de las TIC, la relación con el entorno, la profesionalización docente y directiva.",
            idObjetivos: 16,
            idDimension: 9,
            idPei: 1
        },{
            nombre:"a. Mejoramiento de la Calidad y la Pertinencia.",
            idObjetivos: 17,
            idDimension: 10,
            idPei: 1
        },{
            nombre:"b. Fortalecimiento de la Planificación, Monitoria y Evaluación de la Gestión Académica.",
            idObjetivos: 18,
            idDimension: 10,
            idPei: 1
        },{
            nombre:"c. Mejoramiento de la Calidad, la Pertinencia y la Equidad.",
            idObjetivos: 19,
            idDimension: 10,
            idPei: 1
        },{
            nombre:"A) Las facultades y centros regionales se insertan en el eje de Los posgrados, la UNAH y el país; diseñando, posgrados que el país, la ciencia y la propia universidad necesitan, contribuyendo de esa manera al desarrollo económico, político y social de nuestro país.",
            idObjetivos: 20,
            idDimension: 11,
            idPei: 1
        },{
            nombre:"B) Las facultades y centros regionales se insertan en el eje de Gestión Académico-Institucional; creando y aprobando nuevos posgrados académicos y profesionalizante,con un sistema de posgrados integrado plenamente a los departamentos.",
            idObjetivos: 20,
            idDimension: 11,
            idPei: 1
        },{
            nombre:"C) Las facultades y centros regionales se insertan en el eje de Evaluación y Acreditación; procurando que sus posgrados sean objeto de evaluación institucional constante, autoevaluación y acreditación regional, para aumentar el prestigio académico de la UNAH.",
            idObjetivos: 20,
            idDimension: 11,
            idPei: 1
        },{
            nombre:"D) Las facultades y centros regionales se insertan en el eje de Investigación, desarrollo e innovación; integrando la función de investigación en sus diferentes posgrados y que estos provechen el programa de investigación que oferta la UNAH (becas, capacitaciones, revistas, congresos) y la estructura de investigación de la UNAH (institutos, grupos, observatorios) todo ello en alineamiento con las prioridades de investigación de la UNAH y de las facultades y centros regionales.",
            idObjetivos: 20,
            idDimension: 11,
            idPei: 1
        },{
            nombre:"F) Las facultades y los centros regionales se insertan en el eje de Regionalización e internacionalización; elaboración y ejecución de estrategias de regionalización interna e internacionalización de los posgrados, con el propósito de formar profesionales con visión de mundo y de enfoque inter y multidisciplinario.",
            idObjetivos: 20,
            idDimension: 11,
            idPei: 1
        },{
            nombre:"G) Las facultades y los centro regionales se insertan en el eje de Formación y capacitación; registrando y acreditando un cuerpo de profesionales especializado en la gestión de posgrados, incluyendo el componente de investigación.",
            idObjetivos: 20,
            idDimension: 11,
            idPei: 1
        },{
            nombre:"E) Las facultades y centros regionales se insertan en el eje de Vinculación Universidad Estado, sectores productivos y sectores sociales; con una relación institucional estructurada, posgrados de la UNAH reconocidos y contribuyendo al desarrollo económico, social y político del país.",
            idObjetivos: 20,
            idDimension: 11,
            idPei: 1
        },{
            nombre:"La infraestructura de las sedes universitarias en termino de aulas, salones, talleres, laboratorios, oficinas u otros, son suficientes y adecuados para el logro de los objetivos institucionales.",
            idObjetivos: 21,
            idDimension: 12,
            idPei: 1
        },{
            nombre:"Los Departamentos Académicos y las carreras disponen del equipo didáctico necesario para facilitar el proceso del desarrollo educativo.",
            idObjetivos: 21,
            idDimension: 12,
            idPei: 1
        },{
            nombre:"La unidad académica cuenta con un presupuesto que le permite realizar adecuadamente las funciones de docencia, investigación, vinculación y gestión académica programadas por la carrera.",
            idObjetivos: 22,
            idDimension: 12,
            idPei: 1
        },{
            nombre:"La institución cuenta con la normativa interna e institucional para garantizar la buena organización, el buen funcionamiento y el cumplimiento de las normas y procedimientos.",
            idObjetivos: 22,
            idDimension: 12,
            idPei: 1
        },{
            nombre:"Las Unidades Académicas y Administrativas disponen y tienen acceso a los servicios de la plataforma tecnológica y al programa de desarrollo tecnológico de la UNAH.",
            idObjetivos: 21,
            idDimension: 13,
            idPei: 1
            /////////
            /////////
        },{
            nombre:"Fortalecimiento Institucional mediante el desarrollo Docente y Personal Administrativo responde a las necesidades académicas y a lo establecido en la normativa institucional",
            idObjetivos: 23,
            idDimension: 13,
            idPei: 1
        },{
            nombre:"Mejoramiento de la Calidad, la Pertinencia y la Equidad.",
            idObjetivos: 24,
            idDimension: 14,
            idPei: 1
        },{
            nombre:"a) Fortalecer la capacidad institucional para la elaboración, negociación y ejecución de iniciativas de cooperación con instancias internacionales para potenciar la labor docente, la investigación científica y las actividades de apoyo de la UNAH a la sociedad, la formación integral de los estudiantes y docentes, la infraestructura, la cooperación al desarrollo y el intercambio de conocimiento.",
            idObjetivos: 25,
            idDimension: 15,
            idPei: 1
        },{
            nombre:"c) Implementación del registro de acciones de internacionalización.",
            idObjetivos: 25,
            idDimension: 15,
            idPei: 1
        },{
            nombre:"b) Incremento del grado de visibilidad e involucramiento interinstitucional de la UNAH en el marco de las redes universitarias.",
            idObjetivos: 25,
            idDimension: 15,
            idPei: 1
        },{
            nombre:"a) Lograr que la UNAH lleve a cabo en forma sostenida y permanente, un ejercicio pleno y responsable del principio de autonomía, que le permita participar activamente en la transformación de la sociedad hondureña.",
            idObjetivos: 26,
            idDimension: 16,
            idPei: 1
        },{
            nombre:"b) Fortalecer la atribución que la Constitución de la República le otorga a la UNAH de organizar, dirigir y desarrollar la educación superior y profesional.",
            idObjetivos: 27,
            idDimension: 16,
            idPei: 1
        },{
            nombre:"b) Fortalecer la atribución que la Constitución de la República le otorga a la UNAH de organizar, dirigir y desarrollar la educación superior y profesional.",
            idObjetivos: 27,
            idDimension: 17,
            idPei: 1
        },{
            nombre:"a. Conducir en coordinación con la Rectoría de la UNAH, el cumplimiento de la atribución que la Constitución de la República le otorga a la UNAH de organizar, dirigir y desarrollar la educación superior y profesional de Honduras",
            idObjetivos: 29,
            idDimension: 17,
            idPei: 1
        },{
            nombre:"b. Conducir e impulsar el cumplimiento de los trece objetivos estratégicos del Sistema de Educación Superior formulados en el Plan Estratégico de Desarrollo 2014-2023, en forma proactiva y con gestión de apoyo financiero nacional e internacional.",
            idObjetivos: 29,
            idDimension: 17,
            idPei: 1
        },{
            nombre:"c. Consolidar el funcionamiento del Consejo Nacional de Educación, ejerciendo la Rectoría de la UNAH la Vice-Presidencia del mismo y la Dirección de Educación Superior, la Secretaría, así como la conducción de proyectos de integración de la Educación Nacional a través de la Comisión Bipartita.",
            idObjetivos: 29,
            idDimension: 17,
            idPei: 1
        },{
            nombre:"Promover las TICs en apoyo a la docencia no presencial para el fortalecimiento del Sistema de Educación a Distancia",
            idObjetivos: 30,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Fortalecer la docencia presencial a travès de las TICs.",
            idObjetivos: 30,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Promover la capacitación continua de los miembros de la comunidad universitaria para el desarrollo de las competencias de las TIC.",
            idObjetivos: 31,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Apoyar mediante el uso de los espacios y recursos web, las actividades propias de difusión y posicionamiento de la institución en todas las áreas del contexto nacional e internacional",
            idObjetivos: 31,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Promover la aplicación de nuevas tecnologías en las diferentes áreas del conocimiento con base en las necesidades institucionales y tendencias mundiales.",
            idObjetivos: 31,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Promover el uso adecuado, ético y solidario de las TIC para el desarrollo de la academia, la ciencia y la cultura.",
            idObjetivos: 31,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Contar con un Sistema de Unidades de Recursos de Información certificado",
            idObjetivos: 31,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Intercambiar información con otras instituciones de manera rápida y eficiente.",
            idObjetivos: 31,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Apoyar el desarrollo permanente, sostenibilidad y seguridad de la UNAHnet.",
            idObjetivos: 32,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Disponer de los sistemas de información y aplicaciones informáticas para el desarrollo institucional observando las normas y políticas institucionales y las leyes nacionales.",
            idObjetivos: 32,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Optimizar la adquisición y mantenimiento de equipo informático observando las normas y políticas institucionales y las leyes nacionales. (Plan de Renovación, Plan de Adquisición y Plan de Mantenimiento - REFERENCIA)",
            idObjetivos: 32,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Gestionar la administración electrónica a través de la automatización de los servicios académicos y administrativos.",
            idObjetivos: 33,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Disponer de informacion institucional en soporte electrónico o de manera digital, con el fin de mejorar todas las gestiones tanto administrativas como academicas. (Repositorios - REFERENCIA)",
            idObjetivos: 33,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Modernizar los procesos institucionales incrementando su eficiencia y ejecución (Inteligencia de Negocios - REFERENCIA)",
            idObjetivos: 33,
            idDimension: 18,
            idPei: 1
        },{
            nombre:"Contar con un marco regulatorio que garantice un crecimiento estandarizado y un uso eficiente de los recursos de TI en la institución.",
            idObjetivos: 33,
            idDimension: 18,
            idPei: 1
        }])

        await db.resultado.bulkCreate([{
            nombre: "1. Implementados currículos innovadores a nivel de grado y postgrado (macro, meso y micro currículos), en todas las Facultades y Centros Regionales Universitarios.",
            descripcion: "1. Implementados currículos innovadores a nivel de grado y postgrado (macro, meso y micro currículos), en todas las Facultades y Centros Regionales Universitarios.",
            idArea: 1,
            idObjetivos: 1,
            idDimension: 1,
            idPei: 1
        },{
            nombre: "2. Aplicada la política de bimodalidad con base en los diagnósticos regionales de necesidades y potencialidades auténticas.",
            descripcion: "2. Aplicada la política de bimodalidad con base en los diagnósticos regionales de necesidades y potencialidades auténticas.",
            idArea: 2,
            idObjetivos: 2,
            idDimension: 1,
            idPei: 1
        },{
            nombre: "a.1) Las facultades y los centros regionales desarrollan proyectos de investigación enmarcados en los temas prioritarios de la UNAH y de la facultad o centro regional a la cual están adscritas.",
            descripcion: "a.1) Las facultades y los centros regionales desarrollan proyectos de investigación enmarcados en los temas prioritarios de la UNAH y de la facultad o centro regional a la cual están adscritas.",
            idArea: 3,
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre: "a.4) Las facultades y los centros regionales promueven la asignación de investigación como carga académica en la UNAH, con el desarrollo de proyectos de investigación.",
            descripcion: "a.4) Las facultades y los centros regionales promueven la asignación de investigación como carga académica en la UNAH, con el desarrollo de proyectos de investigación.",
            idArea: 3,
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre: "d.1) Las facultades y los centros regionales participan en el programa de capacitación ofertado por la Dirección de Investigación Científica.",
            descripcion: "d.1) Las facultades y los centros regionales participan en el programa de capacitación ofertado por la Dirección de Investigación Científica.",
            idArea: 4,
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        },{
            nombre: "d.1) Las facultades y los centros regionales participan en el programa de capacitación ofertado por la Dirección de Investigación Científica.",
            descripcion: "d.1) Las facultades y los centros regionales participan en el programa de capacitación ofertado por la Dirección de Investigación Científica.",
            idArea: 4,
            idObjetivos: 3,
            idDimension: 2,
            idPei: 1
        }])

        await Empleado.create({
            id: 1,
            dni: "02012",
            nombre: "root",
            apellido: "root",
            direccion: "La libertad",
            telefono: "123",
            fechaNacimiento:'1995-08-07',
            sexo: "M",
            idInstitucion:1
        });
        
        await User.create({
            email: "cjso0323@gmail.com",
            username: "root",
            password: bcrypt.hashSync(config.secret, 8),
            idEmpleado: 1,
            idRol: 1
        });

        //Agregue tabla catalogo de permisos
        await Permiso.bulkCreate([{
            Permiso: "All_User",
            Descripcion: "Permite al usuario acceder a todo el sistema."
        },
        {
            Permiso: "Delete_User",
            Descripcion: "Permite al usuario eliminar."
        },
        {
            Permiso: "Create_User",
            Descripcion: "Permite al usuario crear."
        },
        {
            Permiso: "Read_User",
            Descripcion: "Permite al usuario solamente leer."
        },
        {
            Permiso: "Update_User",
            Descripcion: "Permite al usuario editar."
        }]);

        await roles_permiso.bulkCreate([{
            idRol: 1,
            idPermiso: 1
        },
        {
            idRol: 1,
            idPermiso: 2
        },
        {
            idRol: 1,
            idPermiso: 3
        }])

        
            /// Tareas desde aqui
        /// CATALOGO DE OBJETO DEL GASTO

        await db.grupogasto.bulkCreate([{
            nombre: "Insumos",
            identificador: 3000
        },
        {
            nombre: "Servicios no personales",
            identificador: 2000
        }]);
        ///Grupo del gasto
        await db.objetogasto.bulkCreate([{
            nombre: "Gasolina",
            identificador: 30001,
            idgrupo:1
        },{
            nombre: "Diesel",
            identificador: 30002,
            idgrupo:1
        },{
            nombre: "Alimentacion",
            identificador: 20001,
            idgrupo:1
        },
        {
            nombre: "Viaticos",
            identificador: 10001,
            idgrupo:1
        }]);

    //FUente
    await db.fuente.bulkCreate([{
        nombre: "Ingresos del estado",
        identificador: "11",
    },{
        nombre: "Ahorros",
        identificador:"12",
    },{
        nombre: "ingresos propios",
        identificador: "12B",
        idgrupo:1
    }]);
    
    ///unidad de medida

    await db.unidadmedida.bulkCreate([{
        nombre: "Litros",
    }]);

    await db.tarea.bulkCreate([{
        nombre: "Compra de Combustible",
        descripcion:"Utilizacion de Diesel",
        isPresupuesto:true
    },{
        nombre: "Compra de Combustible",
        descripcion:"Utilizacion de Gasolina",
        isPresupuesto:true
    }]);

    await db.presupuesto.bulkCreate([{
        cantidad:10,
        costounitario:40,
        Total:400,
        idgrupo:1,
        idobjeto:2,
        idtarea:1,
        idfuente:1,
        idunidad:1
    },{
        cantidad:20,
        costounitario:40,
        Total:800,
        idgrupo:1,
        idobjeto:1,
        idtarea:2,
        idfuente:1,
        idunidad:1
    }]);
} catch (error) {
    console.log(error);
}


};
