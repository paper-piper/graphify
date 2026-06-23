CREATE OR REPLACE FUNCTION delete_edge(p_source UUID, p_target UUID)
RETURNS boolean AS $$
BEGIN
    DELETE FROM edges
    WHERE source_node = GREATEST(p_source, p_target)
      AND target_node = LEAST(p_source, p_target);
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;
