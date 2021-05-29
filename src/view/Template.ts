
/**
 * Factory class for all HTML elements defined with a HTML template.
 */
export default class Template {
	/**
	 * Retrieves the template from the DOM then clones its content.
	 * @param name template's name
	 * @return a `querySelector` bound to the cloned template element
	 */
	public static import(name: string): (selectors: string) => HTMLElement | null {
		const template = document.querySelector(`template#${name}`) as HTMLTemplateElement
		if (template == null) throw new Error(`cound not find template with name ${name}`)
		
		const element = document.importNode(template.content, true)
		return element.querySelector.bind(element)
	}
}