package sentiment;
import components.xmltree.XMLTree;
import components.xmltree.XMLTree1;

public class XMLUtil {
	public static XMLTree getXMLTree(String URL){
		return new XMLTree1(URL);
	}
	public static XMLTree child(XMLTree xml, String tag) {
		if(xml == null)		return null;
        int index = -1;
        for (int i = xml.numberOfChildren() - 1; i >= 0; i--)
            if (tag.equals(xml.child(i).label()))
                index = i;
        return (index == -1) ? null : xml.child(index);
    }
	public static int indexOf(XMLTree xml, String string) {
        for (int i = 0; i < xml.numberOfChildren(); i++) {
            if (xml.child(i).label().equals(string)) {
                return i;
            }
        }
        return -1;
    }
}
