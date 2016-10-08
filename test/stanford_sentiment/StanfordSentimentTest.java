package stanford_sentiment;
import java.util.Properties;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;

public class StanfordSentimentTest {
	public static void main(String[] args) {
		Properties props = new Properties();
	    props.put("annotators", "tokenize,ssplit,pos,parse,sentiment");
	    StanfordCoreNLP pipeline = new StanfordCoreNLP(props);
	    String sentence = "I am bad.";
	    Annotation document = new Annotation(sentence);
	    pipeline.annotate(document);
	    System.out.println();
	}
}
