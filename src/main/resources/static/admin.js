const adminUrl = '/api/admin'
const userUrl = '/api/user'
const navbarBrandAdmin = document.getElementById('navbar-brand-admin')
const tableUsers = document.getElementById('table-users')

// let formEdit = document.forms['formEdit'];
const urlEdit = '/api/admin/edit'

// const edit = document.getElementById('edit')
const closeEdit = document.getElementById('close-edit')
// const editModal = new bootstrap.Modal(edit)
const editForm = document.getElementById('edit-form')
// const editId = document.getElementById('edit-id')
// const editEmail = document.getElementById('edit-email')
// const editName = document.getElementById('edit-name')
// const editPassword = document.getElementById('edit-password')
let roleEdit = document.getElementById('edit-roles')

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
                        onclick='dataDelete(${user.id})'>Delete</button>
                    </td>
                </tr>`
    }
    tableUsers.innerHTML = table
}

getAdminPage()

function getEditModal(id) {
    console.log(id)
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
    let roles = []
    for (let i = 0; i < roleEdit.length; i++) {
        roles.push({
            id: roleEdit[i].value
        })
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