const userUrl = '/api/user'
const navbarBrandUser = document.getElementById('navbar-brand-user')
const tableUser = document.getElementById('table-user')

async function getUserPage() {
    try {
        const response = await fetch(userUrl)
        const data = await response.json()
        getUserInfo(data)
    } catch (error) {
        console.error('An error occurred while retrieving user information:', error)
    }
}

function getUserInfo(user) {
    let roles = `${user.roles.map(role => role.authority.replace('ROLE_', ''))}`
    navbarBrandUser.innerHTML = `<b><span>${user.email}</span></b>
                                      <span>with roles: </span>
                                      <span>${roles}</span>`

    if (roles.indexOf('ADMIN') === -1) {
        document.getElementById('admin').style.display = 'none'
    }
    let table = ''
    table =
        `<tr>
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.name}</td>
            <td>${roles}</td>
        </tr>`
    tableUser.innerHTML = table
    }

getUserPage()