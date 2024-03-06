const adminUrl = '/api/admin'
const userUrl = '/api/user'
const navbarBrandAdmin = document.getElementById('navbar-brand-admin')
const tableUsers = document.getElementById('table-users')

const urlEdit = '/api/admin/edit'
const editForm = document.getElementById('edit-form')
const closeEdit = document.getElementById('close-edit')

const urlDelete = '/api/admin/delete'
const deleteForm = document.getElementById('delete-form')
const closeDelete = document.getElementById('close-delete')

const newUserForm = document.getElementById('new-user-form')
const tableUsersAdmin = document.getElementById('users-table-tab')

async function getAuthUser() {
    try {
        const response = await fetch(userUrl)
        const user = await response.json()
        navbarBrandAdmin.innerHTML = `<b><span>${user.email}</span></b>
                                         <span>with roles: </span>
                                         <span>${user.roles.map(role => role.authority.replace('ROLE_', ''))}</span>`
    } catch (error) {
        console.error('An error occurred while retrieving authenticated user information:', error)
    }
}

getAuthUser()

async function getAdminPage() {
    try {
        let response = await fetch(adminUrl)
        let data = await response.json()
        getUsersInfo(data)
    } catch (error) {
        console.error('An error occurred while retrieving users information:', error)
    }
}

function getUsersInfo(users) {
    let table = ''
    for (let user of users) {
        table +=
                `<tr>
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.name}</td>
                    <td>${user.roles.map(role => role.authority.replace('ROLE_', ''))}</td>
                    <td>
                        <button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#editModal'
                        onclick='getEditModal(${user.id})'>Edit</button>
                    </td>
                    <td>
                        <button type='button' class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#deleteModal'
                        onclick='getDeleteModal(${user.id})'>Delete</button>
                    </td>
                </tr>`
    }
    tableUsers.innerHTML = table
}

getAdminPage()

// Edit

function getEditModal(id) {
    fetch(urlEdit + '?id=' + id).then(response => {
        response.json().then(user => {
            document.getElementById('edit-id').value = user.id
            document.getElementById('edit-name').value = user.name
            document.getElementById('edit-email').value = user.email
            document.getElementById('edit-password').value = user.password
            document.getElementById('edit-roles').selectedIndex = user.roles
            })
        }).catch(error => console.error('An error occurred while retrieving information to change user data', error))
}

editForm.addEventListener('submit', user => {
    user.preventDefault()
    let id = document.getElementById('edit-id').value
    let name = document.getElementById('edit-name').value
    let email = document.getElementById('edit-email').value
    let password = document.getElementById('edit-password').value
    let roles = [];
    for (let i = 0; i < editForm.roles.options.length; i++) {
        if (editForm.roles.options[i].selected) roles.push({
            id: editForm.roles.options[i].value,
            role: "ROLE_" + editForm.roles.options[i].text
        });
    }
    let editUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        roles: roles
    }
    let method = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editUser)
    }
    fetch(urlEdit + '?id=' + editUser.id, method).then(() => {
        closeEdit.click()
        getAdminPage()
    })
})

// Delete

function getDeleteModal(id) {
    fetch(urlEdit + '?id=' + id).then(response => {
        response.json().then(user => {
            document.getElementById('delete-id').value = user.id
            document.getElementById('delete-name').value = user.name
            document.getElementById('delete-email').value = user.email
            document.getElementById('delete-password').value = user.password
            document.getElementById('delete-roles').selectedIndex = user.roles
            })
        }).catch(error => console.error('An error occurred while retrieving information to delete user', error))
}

deleteForm.addEventListener('submit', user => {
    user.preventDefault()
    let method = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    }
    fetch(urlDelete + '?id=' + deleteForm.id.value, method).then(() => {
        closeDelete.click()
        getAdminPage()
    })
})

// New user

newUserForm.addEventListener('submit', user => {
    user.preventDefault()
    let name = document.getElementById('create-name').value
    let email = document.getElementById('create-email').value
    let password = document.getElementById('create-password').value
    let roles = [];
    for (let i = 0; i < newUserForm.roles.options.length; i++) {
        if (newUserForm.roles.options[i].selected) roles.push({
            id: newUserForm.roles.options[i].value,
            role: "ROLE_" + newUserForm.roles.options[i].text
        });
    }
    let newUser = {
        name: name,
        email: email,
        password: password,
        roles: roles
    }
    let method = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUser)
    }
    fetch(adminUrl, method).then(() => {
        newUserForm.reset()
        getAdminPage()
        tableUsersAdmin.click()
    })
})