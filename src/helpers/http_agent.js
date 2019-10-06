import superagentDefaults from 'superagent-defaults'

let http_agent = superagentDefaults()
http_agent.set('subtype', 'html')
http_agent.set('npversion', '8.3.11')

export default http_agent;