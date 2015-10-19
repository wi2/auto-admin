module.exports = {
  projects: {
    identity: 'project',
    formItem: [
      {label: 'id', type: 'string', required: true, input: 'text'},
      {label: 'name', type: 'string', required: true, input: 'text'},
      {label: 'website', type: 'string', required: true, input: 'text'}
    ],
    items: [
      {id: 1, name: 'post 1', website: 'www.af83.com'},
      {id: 2, name: 'post 2', website: 'www.google.fr'},
      {id: 3, name: 'post 3', website: 'www.free.fr'}
    ]
  }
}
