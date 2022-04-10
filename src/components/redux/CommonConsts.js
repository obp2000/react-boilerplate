import { createAction, createReducer } from 'redux-act'
import { createSelector } from 'reselect'

const reducer_actions = {}

export const receiveCommonConsts = createAction('receiveCommonConsts')

const initialState = {}

reducer_actions[receiveCommonConsts] = (state, consts) =>
    ({
        ...state,
        ...consts
    })

const common_consts = createReducer(reducer_actions, initialState)

export const selectCommonConsts = ({
    common_consts
}) => common_consts
export const selectNamePlural = ({
    common_consts: {
        options: {
            name_plural
        } = {}
    }
}) => name_plural
export const selectNameSingular = ({
    common_consts: {
        options: {
            name_singular
        } = {}
    }
}) => name_singular
export const selectTextNew = ({
    common_consts: {
        ['new']: text_new
    }
}) => text_new
export const selectTextEdit = ({
    common_consts: {
        edit
    }
}) => edit
export const selectTextDelete = ({
    common_consts: {
        ['delete']: text_delete
    }
}) => text_delete
export const selectYes = ({
    common_consts: {
        yes
    }
}) => yes
export const selectNo = ({
    common_consts: {
        no
    }
}) => no
export const selectObjects = table => ({
    [table]: objects = {}
}) => objects
export const selectOptions = ({
    common_consts: {
        options = {}
    } = {}
}) => options
export const selectErrorMessages = ({
    common_consts
}) => (common_consts.error_messages || {})
export const selectSaveText = ({
    common_consts: {
        save
    }
}) => save
export const selectMainMenu = ({
    common_consts: {
        main_menu = []
    }
}) => main_menu
export const selectBrandText = ({
    common_consts: {
        brand_text
    }
}) => brand_text
export const selectSearchLabel = ({
    common_consts: {
        search
    }
}) => search
export const selectLoginText = ({
    common_consts: {
        login
    }
}) => login
export const selectRegisterText = ({
    common_consts: {
        register
    }
}) => register
export const selectConsts = ({
    common_consts: {
        options: {
            Consts = {}
        } = {}
    }
}) => Consts
export const selectImageLabel = ({
    common_consts: {
        options: {
            image: {
                label
            } = {}
        } = {}
    }
}) => label
export const selectAddText = ({
    common_consts: {
        add
    }
}) => add
export const selectFromText = ({
    common_consts: {
        from
    }
}) => from

export default common_consts
