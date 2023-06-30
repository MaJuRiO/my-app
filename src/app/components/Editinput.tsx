import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    useEditableControls,
    ButtonGroup,
    IconButton,
    Flex,
    Input,
} from '@chakra-ui/react'
export function CustomControlsExample({ value, name }: any) {
    /* Here's a custom control */
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        )
    }

    return (
        <Editable
            defaultValue={value}
            fontWeight={'medium'}
            isPreviewFocusable={false}>
            <EditablePreview />
            <Input as={EditableInput} id={name}/>
            <EditableControls />
        </Editable>
    )
}

