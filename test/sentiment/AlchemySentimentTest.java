package sentiment;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import components.xmltree.XMLTree;

public class AlchemySentimentTest {
	private static String key = "bc5336851577a2cf1e01df99007fd2a538ef6298";
	public static void main(String[] args) {
		String sentence = "I hate you. Go die.";
		System.out.println(score(sentence));
	}
	public static double score(String comment) {
		try {
			XMLTree docSentiment = XMLUtil.child(
					XMLUtil.getXMLTree(getURL(comment)), "docSentiment");
			XMLTree scoreTag = XMLUtil.child(docSentiment, "score");
			/* if no score tag, then comment is considered neutral */
			double score = (scoreTag == null) ? 0
					: Double.parseDouble(scoreTag.child(0).label());
			return score;
		} catch (UnsupportedEncodingException e) {
			System.err.println("UTF-8 encoding not supported");
			return -1;
		}
	}
	public static String getURL(String comment) throws UnsupportedEncodingException{
		return "http://gateway-a.watsonplatform.net/calls/"
				+ "text/TextGetTextSentiment?apikey=" + key + "&text="
	            + URLEncoder.encode(comment, "UTF-8");
	}
}
