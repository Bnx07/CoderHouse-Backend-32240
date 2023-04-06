export const generateUserErrorInfo = (user) => {
    return `Algunas propiedades no están completas
            * primer nombre era necesario ${user.first_name}
            * apellido era necesario ${user.last_name}
            * email era necesario ${user.email}`
}