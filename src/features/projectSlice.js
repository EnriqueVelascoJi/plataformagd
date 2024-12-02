import { createSlice, isRejected } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    newProject: {
        personalInformation: {
           name: '',
           firstSurname: '',
           secondSurname: '',
           email: '',
           domain: 0,
           subdomain: 0,
           area: 0,
           profile: 0
        },
        context: {
           projectName: '',
           projectDescription: '',
           projectScopeDescription: '',
           projectObjective: '',
           region: '',
           informationUse: '',
           deliverables: '',
           aditionalInformation: '',
           startDate: dayjs(new Date()),
           finalDate: dayjs(new Date())

        },
        participants: [
           {   
              idParticipant: 1,
              name: '',
              surname: '',
              email: '',
              position: '',
              area: 0,
              rol: 0           
               
           }
       ],
       isAccepted: false
    },
    newRequirement: {
        personalInformation: {
            name: '',
            firstSurname: '',
            secondSurname: '',
            email: '',
            domain: 0,
            subdomain: 0,
            area: 0,
            profile: 0
        },
        context: {
            projectName: '',
            projectType: '',
            //dataSourceType: '',
            projectDescription: '',
            projectScopeDescription: '',
            projectObjective: '',
            region: '',
            //results: '',
            //systems: '',
            startDate: dayjs(new Date()),
            finalDate: dayjs(new Date())

        },
        participants: [
            {
                idParticipant: 0,
                name: '',
                surname: '',
                email: '',
                position: '',
                area: 0   
            }
        ],
        // mainInformation: {
        //     directionName: '',
        //     projectName: '',
        //     area: '',
        //     creationDate: '',
        //     startDate: '',
        //     finalDate: ''
            
        // },
        // description: {
        //     projectDescription: '',
        //     problem: '',
        //     hypothesis: '',
        //     scope: '',
        //     background: '',
        //     strategicGoals: '',
        //     operationalGoals: '',
        //     expectations: '',
        //     interoperatibility: ''

        // },
        // owners: {
        //     projectOwner: {
        //         name: '',
        //         firstSurname: '',
        //         secondSurname: '',
        //         position: '',
        //     },
        //     informationOwner: {
        //         name: '',
        //         firstSurname: '',
        //         secondSurname: '',
        //         position: '',
        //         area: ''
        //     },
        //     integrants: [
        //         {   
        //             idParticipant: 0,
        //             name: '',
        //             surname: '',
        //             rol: ''
        //         }
        //     ]
        // },
        otherInformation: {
            informationUse: '',
            deliverables: '',
            issues: '',
            techResources: '',
            otherResources: '',
            aditionalInformation: ''
        },
        // aprprovers: [
        //     {
        //         name: '',
        //         surname: '',
        //         email: '',
        //         position: '',
        //         area: ''
        //     }
        // ]
    },
    globalStatus: {
        processId: null,
        projectId: null,
        requirementId: null,
        isProcessAcepted: false, 
        isProjectAccepted: false,
        isRequirementAccepted: false,
    },
    isAccepted: false,
    isRejected: false,
    isSend: false,
    status: '',
    visibleMode: false,
    glosary: []
  },
  reducers: {
    updateProjectForm: (state, action) => {
        state.newProject = action.payload
    },
    updateRequirementForm: (state, action) => {
        state.newRequirement = action.payload
    },
    changeStaus: (state, action) => {
        state.status = action.payload
    },
    changeProcessId: (state, action) => {
        state.processId = action.payload
    },
    changeVisibleMode: (state, action) => {
        state.visibleMode = action.payload
    },
    changeIsAccepted: (state, action) => {
        state.isAccepted = action.payload
    },
    changeisRejected: (state, action) => {
        state.isRejected = action.payload
    },
    changeIsSend: (state, action) => {
        state.isSend = action.payload
    },
    changeGloabalStatus: (state, action) => {
        state.globalStatus = action.payload
    },
    updateGlosary: (state, action) => {
        state.glosary = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {updateProjectForm, updateRequirementForm, changeStaus, changeProcessId, changeVisibleMode, changeGloabalStatus, changeIsAccepted, changeisRejected, changeIsSend, updateGlosary} = projectSlice.actions

export default projectSlice.reducer